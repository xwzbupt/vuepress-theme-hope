import type { PluginSimple } from "markdown-it";
import type { RuleBlock } from "markdown-it/lib/parser_block";

export const codeGroup: PluginSimple = (md) => {
  const CODETAB_MARKER = `@codetab`;

  const codeGroupRule: RuleBlock = (state, startLine, endLine, silent) => {
    let start = state.bMarks[startLine] + state.tShift[startLine];
    let max = state.eMarks[startLine];

    // Check out the first character quickly,
    // this should filter out most of non-containers
    if (state.src[start] !== ":") return false;

    let pos = start + 1;

    // Check out the rest of the marker string
    while (pos <= max) {
      if (state.src[pos] !== ":") break;
      pos += 1;
    }

    const markerCount = pos - start;

    if (markerCount < 3) return false;

    const markup = state.src.slice(start, pos);
    const params = state.src.slice(pos, max);

    if (params.trim() !== "code-group") return false;

    // Since start is found, we can report success here in validation mode
    if (silent) return true;

    // Search for the end of the block
    let nextLine = startLine;
    let autoClosed = false;

    // Search for the end of the block
    while (
      // unclosed block should be autoclosed by end of document.
      // also block seems to be autoclosed by end of parent
      nextLine < endLine
    ) {
      nextLine += 1;
      start = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];

      if (start < max && state.sCount[nextLine] < state.blkIndent)
        // non-empty line with negative indent should stop the list:
        // - ```
        //  test
        break;

      if (
        // match start

        state.src[start] === ":" &&
        // closing fence should be indented less than 4 spaces
        state.sCount[nextLine] - state.blkIndent < 4
      ) {
        // check rest of marker
        for (pos = start + 1; pos <= max; pos++)
          if (state.src[pos] !== ":") break;

        // closing code fence must be at least as long as the opening one
        if (pos - start >= markerCount) {
          // make sure tail has spaces only
          pos = state.skipSpaces(pos);

          if (pos >= max) {
            // found!
            autoClosed = true;
            break;
          }
        }
      }
    }

    const oldParent = state.parentType;
    const oldLineMax = state.lineMax;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    state.parentType = "code_group";

    // this will prevent lazy continuations from ever going past our end marker
    state.lineMax = nextLine - (autoClosed ? 1 : 0);

    const openToken = state.push(`code_group_open`, "div", 1);

    openToken.markup = markup;
    openToken.block = true;
    openToken.info = params;
    openToken.map = [startLine, nextLine - (autoClosed ? 1 : 0)];

    state.md.block.tokenize(
      state,
      startLine + 1,
      nextLine - (autoClosed ? 1 : 0)
    );

    const closeToken = state.push(`code_group_close`, "div", -1);

    closeToken.markup = state.src.slice(start, pos);
    closeToken.block = true;

    state.parentType = oldParent;
    state.lineMax = oldLineMax;
    state.line = nextLine + (autoClosed ? 1 : 0);

    return true;
  };

  const codeTabRule: RuleBlock = (state, startLine, endLine, silent) => {
    let start = state.bMarks[startLine] + state.tShift[startLine];
    let max = state.eMarks[startLine];

    /*
     * Check out the first character quickly,
     * this should filter out most of non-uml blocks
     */
    if (state.src.charAt(start) !== "@") return false;

    let index;

    // Check out the rest of the marker string
    for (index = 0; index < CODETAB_MARKER.length; index++)
      if (CODETAB_MARKER[index] !== state.src[start + index]) return false;

    const markup = state.src.slice(start, start + index);
    const params = state.src.slice(start + index, max);

    // Since start is found, we can report success here in validation mode
    if (silent) return true;

    let nextLine = startLine;
    let autoClosed = false;

    // Search for the end of the block
    while (
      // unclosed block should be autoclosed by end of document.
      // also block seems to be autoclosed by end of parent
      nextLine < endLine
    ) {
      nextLine += 1;
      start = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];

      if (start < max && state.sCount[nextLine] < state.blkIndent)
        // non-empty line with negative indent should stop the list:
        // - ```
        //  test
        break;

      if (
        // match start
        state.src[start] === "@" &&
        // marker should not be indented with respect of opening fence
        state.sCount[nextLine] <= state.sCount[startLine]
      ) {
        let openMakerMatched = true;

        for (index = 0; index < CODETAB_MARKER.length; index++)
          if (CODETAB_MARKER[index] !== state.src[start + index]) {
            openMakerMatched = false;
            break;
          }

        if (openMakerMatched) {
          // found!
          autoClosed = true;
          nextLine -= 1;
          break;
        }
      }
    }

    const oldParent = state.parentType;
    const oldLineMax = state.lineMax;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    state.parentType = "code_tab";

    // this will prevent lazy continuations from ever going past our end marker
    state.lineMax = nextLine;

    const openToken = state.push(`code_tab_open`, "div", 1);

    openToken.block = true;
    openToken.markup = markup;
    openToken.info = params;
    openToken.map = [startLine, nextLine];

    state.md.block.tokenize(state, startLine + 1, nextLine);

    const closeToken = state.push(`code_tab_close`, "div", -1);

    closeToken.block = true;
    closeToken.markup = "";

    state.parentType = oldParent;
    state.lineMax = oldLineMax;
    state.line = nextLine + (autoClosed ? 1 : 0);

    return true;
  };

  md.block.ruler.before("fence", `code_group`, codeGroupRule, {
    alt: ["paragraph", "reference", "blockquote", "list"],
  });

  md.block.ruler.before("fence", "code_tab", codeTabRule, {
    alt: ["paragraph", "reference", "blockquote", "list"],
  });

  md.renderer.rules.code_group_open = (tokens, index): string => {
    let inCodeTab = false;

    for (let i = index; i < tokens.length; i++) {
      const { block, type } = tokens[i];

      if (block) {
        if (type === "code_tab_close") {
          inCodeTab = false;
          continue;
        }

        if (type === "code_tab_open") {
          inCodeTab = true;
          continue;
        }

        if (type === "code_group_close") {
          break;
        }

        if (!inCodeTab) {
          // hide other tokens
          tokens[i].type = "code_group_empty";
          tokens[i].hidden = true;
        }
      }
    }

    return "<CodeGroup>\n";
  };

  md.renderer.rules.code_group_close = (): string => "</CodeGroup>\n";

  md.renderer.rules.code_tab_open = (tokens, index): string => {
    const { info } = tokens[index];
    let fenceFound = false;

    do {
      index += 1;
      const token = tokens[index];
      const { block, type } = token;

      if (type === "code_tab_close") break;

      if (type === "fence" && !fenceFound) {
        fenceFound = true;
        continue;
      }

      if (block) {
        // hide other tokens
        tokens[index].type = "code_tab_empty";

        tokens[index].hidden = true;
      }
    } while (index < tokens.length);

    return `<CodeTab title="${info.replace(/:active/, "").trim()}"${
      info.includes(":active") ? " active" : ""
    }>\n`;
  };

  md.renderer.rules.code_tab_close = (): string => `</CodeTab>\n`;
};
