---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-copy-code2
tagline: Code Copy plugin for VuePress2
actions:
  - text: Guide 💡
    link: /guide.html
    type: primary

  - text: Config 🛠
    link: /config.html

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyright: false
---

## How to use

### Install

::: code-group

@codetab pnpm

```bash
pnpm add -D vuepress-plugin-copy-code2@next
```

@codetab yarn

```bash
yarn add -D vuepress-plugin-copy-code2@next
```

@codetab npm

```bash
npm i -D vuepress-plugin-copy-code2@next
```

:::

### Usage

::: code-group

@codetab TS

```ts
// .vuepress/config.ts
import { copyCodePlugin } from "vuepress-plugin-copy-code2";

export default {
  plugins: [
    copyCodePlugin({
      // your options
    }),
  ],
};
```

@codetab JS

```js
// .vuepress/config.js
const { copyCodePlugin } = require("vuepress-plugin-copy-code2");

module.exports = {
  plugins: [
    copyCodePlugin({
      // your options
    }),
  ],
};
```

:::

## Migrating from V1

We provide a new `pure` option to add a small button besides language text.

Set this option if you think the default style is too fancy.
