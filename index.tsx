import React from "react";

export function querySelector(
  dom: React.JSX.Element,
  querySelector: string
): React.JSX.Element | undefined {
  if (querySelector.startsWith("*")) {
    return dom;
  }
  if (querySelector.startsWith("#")) {
    const elementId = querySelector.substring(1);
    return findFirstInstance(hasId.bind(undefined, elementId), dom);
  }
  if (querySelector.startsWith(".")) {
    const className = querySelector.substring(1);
    return findFirstInstance(hasClass.bind(undefined, className), dom);
  }
  return findFirstInstance(hasType.bind(undefined, querySelector), dom);
}

function hasType(targetTagName: string, element: React.JSX.Element): boolean {
  return element.type === targetTagName;
}

function hasId(targetId: string, element: React.JSX.Element): boolean {
  return element.props.id === targetId;
}

function hasClass(
  targetClassName: string,
  element: React.JSX.Element
): boolean {
  return !!element.props?.className?.split(" ").includes(targetClassName);
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
