import { defineComponent, h, onBeforeUpdate, ref } from "vue";
import type { FunctionalComponent, VNode } from "vue";

// eslint-disable-next-line @typescript-eslint/naming-convention
declare const __VUEPRESS_DEV__: boolean;

import "../styles/code-group.scss";

export interface CodeTabProps {
  title: string;
  active?: boolean;
}

export const CodeTab: FunctionalComponent<CodeTabProps> = (
  { active = false },
  { slots }
): VNode =>
  h(
    "div",
    {
      class: ["code-tab", { active }],
      "aria-selected": active,
    },
    slots.default?.()
  );

CodeTab.displayName = "CodeTab";

export const CodeGroup = defineComponent({
  name: "CodeGroup",

  setup(_props, { slots }) {
    // index of current active item
    const activeIndex = ref(-1);

    // refs of the tab buttons
    const tabRefs = ref<HTMLUListElement[]>([]);

    // activate next tab
    const activateNext = (index = activeIndex.value): void => {
      activeIndex.value = index < tabRefs.value.length - 1 ? index + 1 : 0;
      tabRefs.value[activeIndex.value].focus();
    };

    // activate previous tab
    const activatePrev = (index = activeIndex.value): void => {
      activeIndex.value = index > 0 ? index - 1 : tabRefs.value.length - 1;
      tabRefs.value[activeIndex.value].focus();
    };

    // handle keyboard event
    const keyboardHandler = (event: KeyboardEvent, index: number): void => {
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        activeIndex.value = index;
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        activateNext();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        activatePrev();
      }
    };

    // after removing a code tab, we need to clear the ref
    // of the removed item to avoid issues caused by HMR
    if (__VUEPRESS_DEV__)
      onBeforeUpdate(() => {
        tabRefs.value = [];
      });

    return (): VNode | null => {
      // NOTICE: here we put the `slots.default()` inside the render function to make
      // the slots reactive, otherwise the slot content won’t be changed once the
      // `setup()` function of current component is called

      // get code tab
      const tabs = (slots.default?.() || [])
        .filter(
          (vnode) =>
            (vnode.type as FunctionalComponent).displayName === "CodeTab"
        )
        .map((vnode) => {
          if (vnode.props === null) vnode.props = {};

          return vnode as VNode & { props: Exclude<VNode["props"], null> };
        });

      // do not render anything if there is no code tab
      if (tabs.length === 0) return null;

      // if `activeIndex` is invalid
      if (activeIndex.value < 0 || activeIndex.value > tabs.length - 1) {
        // find the index of the code tab with `active` props
        activeIndex.value = tabs.findIndex((vnode) => "active" in vnode.props);

        // if there is no `active` props on code tab, set the first item active
        if (activeIndex.value === -1) activeIndex.value = 0;
      }
      // set the active item
      else
        tabs.forEach((vnode, index) => {
          vnode.props.active = index === activeIndex.value;
        });

      return h("div", { class: "code-group" }, [
        h(
          "div",
          { class: "code-group-nav" },
          tabs.map((vnode, index) => {
            const isActive = index === activeIndex.value;

            return h(
              "button",
              {
                ref: (element) => {
                  if (element)
                    tabRefs.value[index] = element as HTMLUListElement;
                },
                class: ["code-group-nav-tab", { active: isActive }],
                "aria-pressed": isActive,
                "aria-expanded": isActive,
                onClick: () => {
                  activeIndex.value = index;
                },
                onKeydown: (event: KeyboardEvent) =>
                  keyboardHandler(event, index),
              },
              vnode.props.title as string[]
            );
          })
        ),
        tabs,
      ]);
    };
  },
});
