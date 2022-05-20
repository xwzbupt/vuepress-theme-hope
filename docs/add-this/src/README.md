---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-add-this
tagline: AddThis plugin for VuePress2
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
pnpm add -D vuepress-plugin-add-this@next
```

@codetab yarn

```bash
yarn add -D vuepress-plugin-add-this@next
```

@codetab npm

```bash
npm i -D vuepress-plugin-add-this@next
```

:::

### Usage

::: code-group

@codetab TS

```ts
// .vuepress/config.ts
import { addThisPlugin } from "vuepress-plugin-add-this";

export default {
  plugins: [addThisPlugin({ pubid: "your pubid" })],
};
```

@codetab JS

```js
// .vuepress/config.js
const { addThisPlugin } = require("vuepress-plugin-add-this");

module.exports = {
  plugins: [addThisPlugin({ pubid: "your pubid" })],
};
```

:::

## Migrating from V1

This plugin has not changed from V1.
