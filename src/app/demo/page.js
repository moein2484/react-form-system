"use client";
import React from "react";
import {
  Form,
  FormTextarea,
  FormSelect,
  FormActions,
} from "@/component/myForm";
import styles from "../../components/FormDemos.module.css";
// import "./form.css";
export default function page() {
  const users = [
    {
      id: "u1",
      name: "علی محمدی",
      email: "ali@test.com",
      avatar: "👨‍💼",
      role: "مدیر",
    },
    {
      id: "u2",
      name: "سارا احمدی",
      email: "sara@test.com",
      avatar: "👩‍💼",
      role: "کارشناس",
    },
    {
      id: "u3",
      name: "رضا کریمی",
      email: "reza@test.com",
      avatar: "👨‍🔧",
      role: "فنی",
    },
    {
      id: "u4",
      name: "مریم حسینی",
      email: "maryam@test.com",
      avatar: "👩‍🎨",
      role: "طراح",
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: "40px",
      }}
    >
      <div style={{ width: "400px" }}>
        <Form
          onSubmit={(data) => console.log(data)}
          defaultValues={{ project: "1" }}
        >
          <FormSelect
            name="project"
            label="شرکت"
            searchable
            required
            options={[
              { id: "1", company: "وکیل بین " },
              { id: "2", company: "نوبت وکیل" },
              { id: "3", company: "نوبت مشاور" },
            ]}
            valueKey="id"
            labelKey="company"
          />
          <FormSelect
            name="subProject"
            label="پروژه"
            searchable
            required
            options={[
              { id: "1", company: "پروژه-1" },
              { id: "2", company: "پروژه-2" },
              { id: "3", company: "پروژه -3" },
            ]}
            valueKey="id"
            labelKey="company"
          />
          <FormSelect
            name="user"
            label="انتخاب کاربر"
            placeholder="کاربر را انتخاب کنید"
            required
            requiredMessage="کاربر الزامی است"
            searchable
            multiple
            addItemLabel="افزودن پروژه جدید"
            onAddItem={() => alert("با موفقیت کار میکند")}
            options={users}
            valueKey="id"
            renderContent={(user) => (
              <div className={styles.userOption}>
                <span className={styles.userAvatar}>{user.avatar}</span>
                <div className={styles.userMeta}>
                  <span className={styles.userName}>{user.name}</span>
                  <span className={styles.userEmail}>{user.email}</span>
                </div>
                <span className={styles.userRole}>{user.role}</span>
              </div>
            )}
          />
          <FormTextarea
            name="description"
            label="توضیحات"
            placeholder="توضیحات خود را بنویسید..."
            rows={1}
            required
            requiredMessage="توضیحات الزامی است"
            minLength={5}
            minLengthMessage="توضیحات باید حداقل ۱۰ کاراکتر باشد"
          />
          <FormActions
            // submitClassName="dec"
            showReset={false}
            submitText="ارسال"
          />
        </Form>
      </div>
    </div>
  );
}
