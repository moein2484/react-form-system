"use client";

import { createContext, createElement, useContext } from "react";

const AppearanceContext = createContext({ classNames: {}, styles: {}, unstyled: false });

// Slot names match the keys in the component's CSS module. Context also follows portals.
export function withAppearance(Component) {
  function Appearance({ classNames = {}, styles = {}, unstyled, ...props }) {
    const parent = useContext(AppearanceContext);
    const value = {
      classNames: { ...parent.classNames, ...classNames },
      styles: { ...parent.styles, ...styles },
      unstyled: unstyled ?? parent.unstyled,
    };
    return <AppearanceContext.Provider value={value}><Component {...props} /></AppearanceContext.Provider>;
  }
  Appearance.displayName = `Appearance(${Component.displayName || Component.name})`;
  return Appearance;
}

export function useAppearance() {
  return useContext(AppearanceContext);
}

export function Styled({ as = "div", css = {}, className = "", style, children, ...props }) {
  const appearance = useAppearance();
  const tokens = String(className).split(/\s+/).filter((token) => token && token !== "undefined");
  const slots = tokens.flatMap((token) => Object.keys(css).filter((key) => css[key] === token));
  const base = appearance.unstyled ? tokens.filter((token) => !Object.values(css).includes(token)) : tokens;
  return createElement(as, {
    ...props,
    "data-slot": slots.join(" ") || undefined,
    className: [...base, ...slots.map((key) => appearance.classNames[key]).filter(Boolean)].join(" "),
    style: Object.assign({}, style, ...slots.map((key) => appearance.styles[key])),
  }, children);
}
