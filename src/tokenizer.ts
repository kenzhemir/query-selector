import { assertUnreachable } from "./utils/assertions";

type NonEmptyArray<T> = [T, ...T[]];

type SelectorTokens = {
  type: string | undefined;
  ids: NonEmptyArray<string> | undefined;
  classes: NonEmptyArray<string> | undefined;
};

type tokenType = "name" | "id" | "class";

export function tokenize(selector: string): SelectorTokens {
  let tokenStorage = {
    store: {
      type: undefined,
      ids: undefined,
      classes: undefined,
    } as SelectorTokens,
    getTokens(): SelectorTokens {
      return this.store;
    },
    insert(item: string, itemType: tokenType) {
      if (!item) {
        return;
      }

      switch (itemType) {
        case "name":
          this.store.type = item;
          break;
        case "class":
          if (this.store.classes) {
            this.store.classes.push(item);
          } else {
            this.store.classes = [item];
          }
          break;
        case "id":
          if (this.store.ids) {
            this.store.ids.push(item);
          } else {
            this.store.ids = [item];
          }
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
