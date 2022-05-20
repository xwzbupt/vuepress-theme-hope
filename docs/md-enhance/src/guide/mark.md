---
title: Markup
icon: write
---

Make Markdown files in your VuePress site support markup.

<!-- more -->

## Config

::: code-group

@codetab TS

```ts {8}
// .vuepress/config.ts
import { mdEnhance } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhance({
      // enable markup
      mark: true,
    }),
  ],
};
```

@codetab JS

```js {8}
// .vuepress/config.js
const { mdEnhance } = require("vuepress-plugin-md-enhance");

module.exports = {
  plugins: [
    mdEnhance({
      // enable markup
      mark: true,
    }),
  ],
};
```

:::

## Syntax

Use `== ==` to mark.

## Demo

VuePress Theme Hope is ==powerful==.

```md
VuePress Theme Hope is ==powerful==.
```
