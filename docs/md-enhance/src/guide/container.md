---
title: Custom container
icon: customize
---

The plugin adds tip, note, info, warning, danger and detail container.

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
      // Enable container
      container: true,
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
      // Enable container
      container: true,
    }),
  ],
};
```

:::

## Demo

::: info
Information container
:::

::: note
Note container
:::

::: tip
Tip container
:::

::: warning
Warning container
:::

::: danger
Dangerous container
:::

::: details
Details container
:::

::: info Custom Title

A custom information container with `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: note Custom Title

A custom note container with `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: tip Custom Title

A custom tip container with `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: warning Custom Title

A custom warning container with `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: danger Custom Title

A custom danger container with `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: details Custom Title

A custom details container with `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: info Custom info
:::

::: note Custom note
:::

::: tip Custom tip
:::

::: warning Custom warning
:::

::: danger Custom danger
:::

````md
::: info
Information container
:::

::: note
Note container
:::

::: tip
Tip container
:::

::: warning
Warning container
:::

::: danger
Dangerous container
:::

::: details
Details container
:::

::: info Custom Title

A custom information container with `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: note Custom Title
A custom note container with `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: tip Custom Title

A custom tip container with `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: warning Custom Title

A custom warning container with `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: danger Custom Title

A custom danger container with `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: details Custom Title

A custom details container with `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: info Custom info
:::

::: note Custom note
:::

::: tip Custom tip
:::

::: warning Custom warning
:::

::: danger Custom danger
:::
````
