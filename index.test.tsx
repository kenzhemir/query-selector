import { describe, expect, test } from "bun:test";
import React from "react";
import { querySelector } from "./index.js";

describe("querySelector", () => {
  test("should find elements by their name", () => {
    expect(
      querySelector(documentWith(<div id="find-this"></div>), "div")
    ).toMatchObject(<div></div>);
    expect(
      querySelector(
        documentWith(
          <div>
            <div>
              <span id="find-this"></span>
            </div>
            <span id="find-not-this"></span>
          </div>
        ),
        "span"
      )
    ).toMatchObject(<span id="find-this"></span>);
  });

  test("should find elements by their class name", () => {
    expect(
      querySelector(
        documentWith(
          <div>
            <span id="find-not-this" className="my-class"></span>
            <span id="find-not-this" className="my-other-class"></span>
            <span id="find-this" className="my-target-class"></span>
            <span id="find-not-this" className="my-target-class"></span>
          </div>
        ),
        ".my-target-class"
      )
    ).toMatchObject(<span id="find-this" className="my-target-class"></span>);
  });

  test("should find elements by their id", () => {
    expect(
      querySelector(
        documentWith(
          <div>
            <span id="find-not-this" className="my-class"></span>
            <span id="find-not-this" className="my-other-class"></span>
            <span id="find-this" className="my-target-class"></span>
            <span id="find-this" className="my-non-target-class"></span>
          </div>
        ),
        "#find-this"
      )
    ).toMatchObject(<span id="find-this" className="my-target-class"></span>);
  });
});

const documentWith = (bodyContent: React.JSX.Element) => (
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
    </head>
    <body>{bodyContent}</body>
  </html>
);
