import { hash } from "@vuepress/utils";

import type { PluginSimple } from "markdown-it";
import type { default as Renderer } from "markdown-it/lib/renderer";

const mermaidRender: Renderer.RenderRule = (tokens, index) => {
  const token = tokens[index];
  const key = `mermaid-${hash(index)}`;
  const { content } = token;

  return `<Mermaid id="${key}" code="${encodeURIComponent(
    content
  )}"></Mermaid>`;
};

// a hack for sequenceDiagram
const mermaidHackRender = (
  name: string,
  content: string,
  index: number
): string =>
  `<Mermaid id="mermaid-${hash(index)}" code="${encodeURIComponent(
    `${name}\n${content
      .split("\n")
      .map((line) => (line ? `  ${line}` : ""))
      .join("\n")}`
  )}"></Mermaid>`;

export const mermaid: PluginSimple = (md) => {
  // Handle ```mermaid blocks
  const fence = md.renderer.rules.fence;

  md.renderer.rules.fence = (...args): string => {
    const [tokens, index] = args;
    const { content, info } = tokens[index];

    if (info.trim() === "mermaid") return mermaidRender(...args);
    if (info.trim() === "sequence")
      return mermaidHackRender("sequenceDiagram", content, index);
    if (info.trim() === "class")
      return mermaidHackRender("classDiagram", content, index);
    if (info.trim() === "state")
      return mermaidHackRender("stateDiagram-v2", content, index);
    if (info.trim() === "er")
      return mermaidHackRender("erDiagram", content, index);
    if (info.trim() === "journey")
      return mermaidHackRender("journey", content, index);
    if (info.trim() === "gantt")
      return mermaidHackRender("gantt", content, index);
    if (info.trim() === "pie") return mermaidHackRender("pie", content, index);
    if (info.trim() === "git-graph")
      return mermaidHackRender("gitGraph", content, index);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return fence!(...args);
  };

  md.renderer.rules.mermaid = mermaidRender;
};
