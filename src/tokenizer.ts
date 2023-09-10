import { assertUnreachable } from "./utils/assertions";

type SelectorTokens = {
  name: string | undefined;
  ids: string[];
  classNames: string[];
};

type tokenType = "name" | "id" | "class";

export function tokenize(selector: string): SelectorTokens {
  let tokenStorage = {
    name: undefined as string | undefined,
    ids: [] as string[],
    classNames: [] as string[],
    getTokens(): SelectorTokens {
      return {
        name: this.name,
        classNames: this.classNames,
        ids: this.ids,
      };
    },
    insert(item: string, itemType: tokenType) {
      if (!item) {
        return;
      }

      switch (itemType) {
        case "name":
          this.name = item;
          break;
        case "class":
          this.classNames.push(item);
          break;
        case "id":
          this.ids.push(item);
          break;
        default:
          throw assertUnreachable(itemType);
      }
    },
  };

  let currentItem = "";
  let currentItemType: tokenType = "name";

  for (const char of selector) {
    switch (char) {
      case ".":
        tokenStorage.insert(currentItem, currentItemType);
        currentItem = "";
        currentItemType = "class";
        break;
      case "#":
        tokenStorage.insert(currentItem, currentItemType);
        currentItem = "";
        currentItemType = "id";
        break;
      default:
        currentItem += char;
    }
  }

  tokenStorage.insert(currentItem, currentItemType);
  return tokenStorage.getTokens();
}
