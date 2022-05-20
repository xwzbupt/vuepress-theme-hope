---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-sitemap2
tagline: Sitemap generation for VuePress2
action:
  - text: Guide 💡
    link: /guide.html
    type: primary

  - text: Config 🛠
    link: /config.html

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyrightText: false
---

## How to use

### Install

::: code-group

@codetab pnpm

```bash
pnpm add -D vuepress-plugin-sitemap2@next
```

@codetab yarn

```bash
yarn add -D vuepress-plugin-sitemap2@next
```

@codetab npm

```bash
npm i -D vuepress-plugin-sitemap2@next
```

:::

### Usage

::: code-group

@codetab TS

```ts
// .vuepress/config.ts
import { sitemapPlugin } from "vuepress-plugin-sitemap2";

export default {
  plugins: [
    sitemapPlugin({
      // your options
    }),
  ],
};
```

@codetab JS

```js
// .vuepress/config.js
const { sitemapPlugin } = require("vuepress-plugin-sitemap2");

module.exports = {
  plugins: [
    sitemapPlugin({
      // your options
    }),
  ],
};
```

:::
