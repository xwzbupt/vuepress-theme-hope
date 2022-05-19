import { describe, it, expect } from "vitest";
import MarkdownIt = require("markdown-it");
import { codeGroup } from "../../src/node/markdown-it/codeGroup";

const markdownIt = MarkdownIt({ linkify: true }).use(codeGroup);

describe("code group", () => {
  it("shoud render single block", () => {
    expect(
      markdownIt.render(`
::: code-group

@codetab js

\`\`\`js
const a = 1;
\`\`\`

:::
    `)
    ).toBe(`<CodeGroup>
<CodeTab title="js">
<pre><code class="language-js">const a = 1;
</code></pre>
</CodeTab>
</CodeGroup>
`);

    expect(
      markdownIt.render(`
::: code-group
@codetab js
\`\`\`js
const a = 1;
\`\`\`
:::
    `)
    ).toBe(`<CodeGroup>
<CodeTab title="js">
<pre><code class="language-js">const a = 1;
</code></pre>
</CodeTab>
</CodeGroup>
`);
  });

  it("shoud render mutiple block", () => {
    expect(
      markdownIt.render(`
::: code-group

@codetab js

\`\`\`js
const a = 1;
\`\`\`

@codetab ts

\`\`\`ts
const a = 1;
\`\`\`

:::
`)
    ).toBe(`<CodeGroup>
<CodeTab title="js">
<pre><code class="language-js">const a = 1;
</code></pre>
</CodeTab>
<CodeTab title="ts">
<pre><code class="language-ts">const a = 1;
</code></pre>
</CodeTab>
</CodeGroup>
`);

    expect(
      markdownIt.render(`
::: code-group
@codetab js
\`\`\`js
const a = 1;
\`\`\`
@codetab ts
\`\`\`ts
const a = 1;
\`\`\`
:::
`)
    ).toBe(`<CodeGroup>
<CodeTab title="js">
<pre><code class="language-js">const a = 1;
</code></pre>
</CodeTab>
<CodeTab title="ts">
<pre><code class="language-ts">const a = 1;
</code></pre>
</CodeTab>
</CodeGroup>
`);
  });

  it("shoud support active", () => {
    expect(
      markdownIt.render(`
::: code-group

@codetab:active js

\`\`\`js
const a = 1;
\`\`\`

:::
    `)
    ).toBe(`<CodeGroup>
<CodeTab title="js" active>
<pre><code class="language-js">const a = 1;
</code></pre>
</CodeTab>
</CodeGroup>
`);

    expect(
      markdownIt.render(`
::: code-group
@codetab:active js
\`\`\`js
const a = 1;
\`\`\`
:::
    `)
    ).toBe(`<CodeGroup>
<CodeTab title="js" active>
<pre><code class="language-js">const a = 1;
</code></pre>
</CodeTab>
</CodeGroup>
`);

    expect(
      markdownIt.render(`
::: code-group

@codetab js

\`\`\`js
const a = 1;
\`\`\`

@codetab:active ts

\`\`\`ts
const a = 1;
\`\`\`

:::
    `)
    ).toBe(`<CodeGroup>
<CodeTab title="js">
<pre><code class="language-js">const a = 1;
</code></pre>
</CodeTab>
<CodeTab title="ts" active>
<pre><code class="language-ts">const a = 1;
</code></pre>
</CodeTab>
</CodeGroup>
`);

    expect(
      markdownIt.render(`
::: code-group
@codetab js
\`\`\`js
const a = 1;
\`\`\`
@codetab:active ts
\`\`\`ts
const a = 1;
\`\`\`
:::
    `)
    ).toBe(`<CodeGroup>
<CodeTab title="js">
<pre><code class="language-js">const a = 1;
</code></pre>
</CodeTab>
<CodeTab title="ts" active>
<pre><code class="language-ts">const a = 1;
</code></pre>
</CodeTab>
</CodeGroup>
`);
  });

  it("should ignore other items", () => {
    expect(
      markdownIt.render(`
::: code-group

\`\`\`coffee
const a = 1;
\`\`\`

@codetab:active js

\`\`\`js
const a = 1;
\`\`\`

\`\`\`ts
const a = 1;
\`\`\`

:::
    `)
    ).toBe(`<CodeGroup>
<CodeTab title="js" active>
<pre><code class="language-js">const a = 1;
</code></pre>
</CodeTab>
</CodeGroup>
`);

    expect(
      markdownIt.render(`
::: code-group
\`\`\`coffee
const a = 1;
\`\`\`
@codetab:active js
\`\`\`js
const a = 1;
\`\`\`
\`\`\`ts
const a = 1;
\`\`\`
:::
    `)
    ).toBe(`<CodeGroup>
<CodeTab title="js" active>
<pre><code class="language-js">const a = 1;
</code></pre>
</CodeTab>
</CodeGroup>
`);

    expect(
      markdownIt.render(`
::: code-group

@codetab js

A text

\`\`\`js
const a = 1;
\`\`\`

Another text

@codetab:active ts

Another text again

\`\`\`ts
const a = 1;
\`\`\`

Another text again

:::
    `)
    ).toBe(`<CodeGroup>
<CodeTab title="js">
<pre><code class="language-js">const a = 1;
</code></pre>
</CodeTab>
<CodeTab title="ts" active>
<pre><code class="language-ts">const a = 1;
</code></pre>
</CodeTab>
</CodeGroup>
`);

    expect(
      markdownIt.render(`
::: code-group
@codetab js
A text
\`\`\`js
const a = 1;
\`\`\`
Another text
@codetab:active ts
Another text again
\`\`\`ts
const a = 1;
\`\`\`
Another text again
:::
    `)
    ).toBe(`<CodeGroup>
<CodeTab title="js">
<pre><code class="language-js">const a = 1;
</code></pre>
</CodeTab>
<CodeTab title="ts" active>
<pre><code class="language-ts">const a = 1;
</code></pre>
</CodeTab>
</CodeGroup>
`);
  });
});
