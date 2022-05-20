---
home: true
title: 主页
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-blog2
tagline: 为 VuePress2 提供博客功能
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
pnpm add -D vuepress-plugin-blog2@next
```

@codetab yarn

```bash
yarn add -D vuepress-plugin-blog2@next
```

@codetab npm

```bash
npm i -D vuepress-plugin-blog2@next
```

:::

### 使用

::: code-group

@codetab TS

```ts
// .vuepress/config.ts
import { blogPlugin } from "vuepress-plugin-blog2";

export default {
  plugins: [
    blogPlugin({
      //插件选项
    }),
  ],
};
```

@codetab JS

```js
// .vuepress/config.js
const { blogPlugin } = require("vuepress-plugin-blog2");

module.exports = {
  plugins: [
    blogPlugin({
      //插件选项
    }),
  ],
};
```

:::

## 从 V1 迁移

此插件未发布 V1 版本。
