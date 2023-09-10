import React from "react";

export function querySelector(
  dom: React.JSX.Element,
  querySelector: string
): React.JSX.Element | undefined {
  return findFirstInstance(querySelector, dom);
}

function findFirstInstance(
  key: string,
  dom: React.JSX.Element
): React.JSX.Element | undefined {
  if (dom.type === key) {
    return dom;
  }
  const children = dom.props?.children;

  if (Array.isArray(children)) {
    for (const childNode of children) {
      const foundElement = findFirstInstance(key, childNode);
      if (foundElement) {
        return foundElement;
      }
    }
  } else if (typeof children === "object") {
    return findFirstInstance(key, children);
  }
  return undefined;
}
