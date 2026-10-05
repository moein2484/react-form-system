import test from "node:test";
import assert from "node:assert/strict";
import { fieldRules } from "../src/component/myForm/core/validation.js";

test("required is authoritative and its own message wins over every other rule", async () => {
  for (const value of [undefined, null, "", "  ", [], NaN]) {
    const required = fieldRules({ required: true, requiredMessage: "required-message", rules: {
      min: { value: 10, message: "min-message" }, validate: () => "custom-message",
    } });
    assert.equal(await required.validate(value), "required-message");
    const optional = fieldRules({ required: false, rules: { validate: () => "must not execute" } });
    assert.equal(await optional.validate(value), true);
  }
});

test("zero is valid and boolean controls require true only when required", async () => {
  assert.equal(await fieldRules({ required: true }).validate(0), true);
  assert.equal(await fieldRules({ required: true }).validate([0]), true);
  assert.equal(await fieldRules({ required: true, boolean: true, requiredMessage: "check" }).validate(false), "check");
  assert.equal(await fieldRules({ required: false, boolean: true }).validate(false), true);
  assert.equal(await fieldRules({ required: true, boolean: true }).validate(true), true);
});

test("optional populated fields still enforce ranges, length, and format", async () => {
  const rules = fieldRules({ rules: { min: { value: 0, message: "low" }, max: { value: 100, message: "high" } } });
  assert.equal(await rules.validate(-1), "low");
  assert.equal(await rules.validate(101), "high");
  assert.equal(await rules.validate(0), true);
  const string = fieldRules({ rules: { minLength: { value: 3, message: "short" }, maxLength: { value: 5, message: "long" } } });
  assert.equal(await string.validate("ab"), "short");
  assert.equal(await string.validate("abcdef"), "long");
  const date = fieldRules({ rules: { min: { value: "2020-01-01", message: "old" } } });
  assert.equal(await date.validate("2019-12-31"), "old");
  const pattern = fieldRules({ rules: { pattern: { value: /^a+$/g, message: "format" } } });
  assert.equal(await pattern.validate("aaa"), true);
  assert.equal(await pattern.validate("aaa"), true);
  assert.equal(await pattern.validate("b"), "format");
});

test("async validators and cross-field values work for functions and maps", async () => {
  const values = { password: "demo" };
  const matching = fieldRules({ rules: { validate: async (value, data) => value === data.password || "mismatch" } });
  assert.equal(await matching.validate("demo", values), true);
  assert.equal(await matching.validate("other", values), "mismatch");
  const map = fieldRules({ rules: { validate: { first: async () => true, second: async () => "server-error" } } });
  assert.equal(await map.validate("nonempty"), "server-error");
});
