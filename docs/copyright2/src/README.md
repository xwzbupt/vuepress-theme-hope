---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-copyright2
tagline: Append copyright info during copy
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
pnpm add -D vuepress-plugin-copyright2@next
```

@codetab yarn

```bash
yarn add -D vuepress-plugin-copyright2@next
```

@codetab npm

```bash
npm i -D vuepress-plugin-copyright2@next
```

:::

### Usage

::: code-group

@codetab TS

```ts
// .vuepress/config.ts
import { copyrightPlugin } from "vuepress-plugin-copyright2";

export default {
  plugins: [
    copyrightPlugin({
      // your options
    }),
  ],
};
```

@codetab JS

```js
// .vuepress/config.js
const { copyrightPlugin } = require("vuepress-plugin-copyright2");

module.exports = {
  plugins: [
    copyrightPlugin({
      // your options
    }),
  ],
};
```

:::
