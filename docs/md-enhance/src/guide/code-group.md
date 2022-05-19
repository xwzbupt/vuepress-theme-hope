---
title: CodeGroup
icon: code
---

The plugin provides you code group support.

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
      // adds code group support
      codegroup: true,
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
      // adds code group support
      codegroup: true,
    }),
  ],
};
```

:::

## Usage

You need to use `code-group` container, inside it, place `@codetab` marker with code fence.

If you want a tab be activated by default, you can append a `:active` suffix at the end of marker.

::: note

Only code fence after `@codetab` marker is allowed inside codegroup container, other markdown content will be ignored.

:::

## Demo

::: code-group

@codetab pnpm

```bash
pnpm add -D vuepress-theme-hope@next
```

@codetab yarn

```bash
yarn add -D vuepress-theme-hope@next
```

@codetab:active npm

```bash
npm i -D vuepress-theme-hope@next
```

:::

````md
::: code-group

@codetab pnpm

```bash
pnpm add -D vuepress-theme-hope@next
```

@codetab yarn

```bash
yarn add -D vuepress-theme-hope@next
```

@codetab:active npm

```bash
npm i -D vuepress-theme-hope@next
```

:::
````
