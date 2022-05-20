---
home: true
title: 主页
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-seo2
tagline: 站点的全面 SEO 增强
actions:
  - text: 快速上手 💡
    link: /zh/guide.html
    type: primary

  - text: 配置 🛠
    link: /zh/config.html

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyright: false
---

## 使用插件

### 安装

::: code-group

@codetab pnpm

```bash
pnpm add -D vuepress-plugin-seo2@next
```

@codetab yarn

```bash
yarn add -D vuepress-plugin-seo2@next
```

@codetab npm

```bash
npm i -D vuepress-plugin-seo2@next
```

:::

### 使用

::: code-group

@codetab TS

```ts
// .vuepress/config.ts
import { seoPlugin } from "vuepress-plugin-seo2";

export default {
  plugins: [
    seoPlugin({
      // 你的选项
    }),
  ],
};
```

@codetab JS

```js
// .vuepress/config.js
const { seoPlugin } = require("vuepress-plugin-seo2");

module.exports = {
  plugins: [
    seoPlugin({
      // 你的选项
    }),
  ],
};
```

:::
