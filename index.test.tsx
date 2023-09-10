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
