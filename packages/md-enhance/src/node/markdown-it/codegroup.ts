/**
 * Forked and modifyed from https://github.com/markdown-it/markdown-it-container/blob/master/index.js
 *
 * Copyright (c) 2015 Vitaly Puzrin, Alex Kocharin.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

import type { MarkdownEnv } from "@vuepress/markdown";
import type { Options, PluginWithOptions } from "markdown-it";
import type { default as Token } from "markdown-it/lib/token";
import type { default as Renderer, RenderRule } from "markdown-it/lib/renderer";
import type { RuleBlock } from "markdown-it/lib/parser_block";

export interface MarkdownItContainerOptions {
  name: string;
  marker?: string;
  validate?: (params: string, markup: string) => boolean;
  render?: RenderRule;
  openRender?: RenderRule;
  closeRender?: RenderRule;
}

export const container: PluginWithOptions<MarkdownItContainerOptions> = (
  md
) => {
  const codeGroupRule: RuleBlock = (state, startLine, endLine, silent) => {
    let pos;
    let nextLine;
    let autoClosed = false;
    let start = state.bMarks[startLine] + state.tShift[startLine];
    let max = state.eMarks[startLine];

    // Check out the first character quickly,
    // this should filter out most of non-containers
    if (state.src.charCodeAt(start) !== /* : */ 58) return false;

    // Check out the rest of the marker string
    //
    for (pos = start + 1; pos <= max; pos++) if (":" !== state.src[pos]) break;

    const markerCount = pos - start;

    if (markerCount < 3) return false;

    pos -= pos - start;

    const markup = state.src.slice(start, pos);
    const params = state.src.slice(pos, max);

    if (params.trim() !== "code-group") return false;

    // Since start is found, we can report success here in validation mode
    //
    if (silent) return true;

    // Search for the end of the block
    //
    nextLine = startLine;

    for (;;) {
      nextLine++;
      if (nextLine >= endLine) {
        // unclosed block should be autoclosed by end of document.
        // also block seems to be autoclosed by end of parent
        break;
      }

      start = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];

      if (start < max && state.sCount[nextLine] < state.blkIndent)
        // non-empty line with negative indent should stop the list:
        // - ```
        //  test
        break;

      if (state.src.charCodeAt(start) !== /* : */ 58) continue;

      if (state.sCount[nextLine] - state.blkIndent >= 4)
        // closing fence should be indented less than 4 spaces
        continue;

      for (pos = start + 1; pos <= max; pos++)
        if (":" !== state.src[pos]) break;

      // closing code fence must be at least as long as the opening one
      if (pos - start < markerCount) continue;

      // make sure tail has spaces only
      pos -= pos - start;
      pos = state.skipSpaces(pos);

      if (pos < max) continue;

      // found!
      autoClosed = true;
      break;
    }

    const oldParent = state.parentType;
    const oldLineMax = state.lineMax;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    state.parentType = "code_group";

    // this will prevent lazy continuations from ever going past our end marker
    state.lineMax = nextLine;

    const openToken = state.push(`code_group_open`, "div", 1);

    openToken.markup = markup;
    openToken.block = true;
    openToken.info = params;
    openToken.map = [startLine, nextLine];

    state.md.block.tokenize(state, startLine + 1, nextLine);

    const closeToken = state.push(`code_group_close`, "div", -1);

    closeToken.markup = state.src.slice(start, pos);
    closeToken.block = true;

    state.parentType = oldParent;
    state.lineMax = oldLineMax;
    state.line = nextLine + (autoClosed ? 1 : 0);

    return true;
  };

  const codeGroupItemRule: RuleBlock = (
    state,
    startLine,
    endLine,
    silent
  ) => {};

  md.block.ruler.before("fence", `code_group`, codeGroupRule, {
    alt: ["paragraph", "reference", "blockquote", "list"],
  });
  md.renderer.rules.code_group_open = (): string => "<CodeGroup>\n";
  md.renderer.rules.code_group_close = (): string => "</CodeGroup>\n";
};
