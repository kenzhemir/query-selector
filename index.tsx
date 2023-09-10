import React from "react";

export function querySelector(
  dom: React.JSX.Element,
  querySelector: string
): React.JSX.Element | undefined {
  if (querySelector.startsWith(".")) {
    const className = querySelector.substring(1);
    return findFirstInstanceByClass(className, dom);
  }
  return findFirstInstanceByType(querySelector, dom);
}

function findFirstInstanceByType(
  targetTagName: string,
  dom: React.JSX.Element
): React.JSX.Element | undefined {
  return findFirstInstance((element) => element.type === targetTagName, dom);
}

function findFirstInstanceByClass(
  targetClassName: string,
  dom: React.JSX.Element
): React.JSX.Element | undefined {
  return findFirstInstance(
    (element) =>
      !!element.props?.className?.split(" ").includes(targetClassName),
    dom
  );
}

function findFirstInstance(
  matcher: (element: React.JSX.Element) => boolean,
  dom: React.JSX.Element
): React.JSX.Element | undefined {
  if (matcher(dom)) {
    return dom;
  }
  const children = dom.props?.children;

  if (Array.isArray(children)) {
    for (const childNode of children) {
      const foundElement = findFirstInstance(matcher, childNode);
      if (foundElement) {
        return foundElement;
      }
    }
  } else if (typeof children === "object") {
    return findFirstInstance(matcher, children);
  }
  return undefined;
}
