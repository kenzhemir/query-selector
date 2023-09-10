import React, { isValidElement } from "react";
import { tokenize } from "./tokenizer";
import { isSubarray } from "./utils/array-utils";
import { curry } from "./utils/curry";
import { any, combineFilters } from "./utils/filters";

export function querySelector(
  dom: React.JSX.Element,
  querySelector: string
): React.JSX.Element | undefined {
  if (querySelector.startsWith("*")) {
    return dom;
  }

  const tokens = tokenize(querySelector);

  const typeFilter = tokens.type ? curry(hasType, tokens.type) : any;
  const classFilter = tokens.classes ? curry(hasClasses, tokens.classes) : any;
  const idFilter = tokens.ids ? curry(hasIds, tokens.ids) : any;
  const elementFilter = combineFilters(typeFilter, classFilter, idFilter);

  return findFirstInstance(elementFilter, dom);
}

function hasType(targetTagName: string, element: React.JSX.Element): boolean {
  return element.type === targetTagName;
}

function hasIds(targetIds: string[], element: React.JSX.Element): boolean {
  return targetIds.every((targetId) => targetId === element.props.id);
}

function hasClasses(
  targetClassNames: string[],
  element: React.JSX.Element
): boolean {
  const classNameProp = element.props?.className;
  if (typeof classNameProp === "string") {
    const elementClasses = classNameProp.split(" ");
    return isSubarray(targetClassNames, elementClasses);
  }
  return false;
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
      if (!isValidElement(childNode)) continue;

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
