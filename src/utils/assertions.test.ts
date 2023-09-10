import { describe, expect, test } from "bun:test";
import { assertUnreachable } from "./assertions";

describe("assertUnreachable", () => {
  test("should give a proper error when called", () => {
    // @ts-expect-error
    const error = assertUnreachable("unchecked element");
    expect(error).toHaveProperty(
      "message",
      "Unreachable code: This value was not processed: unchecked element"
    );
    expect(error).toBeInstanceOf(Error);
  });
});
