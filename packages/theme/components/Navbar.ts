/* eslint-disable vue/require-explicit-emits */
import Vue from "vue";
import { AlgoliaOption } from "@mr-hope/vuepress-types";
import AlgoliaSearchBox from "@AlgoliaSearchBox";
import NavLinks from "@theme/components/NavLinks.vue";
import SearchBox from "@SearchBox";
import SidebarButton from "@theme/components/SidebarButton.vue";
import ThemeColor from "@ThemeColor";

const css = (
  el: Element,
  property: keyof Omit<
    CSSStyleDeclaration,
    | "getPropertyPriority"
    | "getPropertyValue"
    | "item"
    | "removeProperty"
    | "setProperty"
    | number
  >
): string => {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const window = el.ownerDocument.defaultView;

  // `null` means not to return pseudo styles
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return window!.getComputedStyle(el, null)[property] as string;
};

export default Vue.extend({
  name: "Navbar",

  components: {
    AlgoliaSearchBox,
    NavLinks,
    SearchBox,
    SidebarButton,
    ThemeColor,
  },

  model: {
    prop: "isMobile",
    event: "change",
  },

  props: {
    isMobile: { type: Boolean, required: true },
  },

  computed: {
    algoliaConfig(): AlgoliaOption | false {
      return (
        this.$themeLocaleConfig.algolia || this.$themeConfig.algolia || false
      );
    },

    isAlgoliaSearch(): boolean {
      return Boolean(
        this.algoliaConfig &&
          this.algoliaConfig.apiKey &&
          this.algoliaConfig.indexName
      );
    },

    canHide(): boolean {
      const autoHide = this.$themeConfig.navAutoHide;

      return autoHide !== "none" && (autoHide === "always" || this.isMobile);
    },
  },

  mounted(): void {
    const contentWidth =
      (this.$refs.siteInfo
        ? ((this.$refs.siteInfo as Vue).$el as HTMLElement).offsetWidth
        : 0) +
      (this.$refs.navLinks
        ? (this.$refs.navLinks as HTMLElement).offsetWidth
        : 0);

    const handler = (): void => {
      const { clientWidth } = document.documentElement;
      const wrapperWidth = this.$el
        ? clientWidth -
          parseInt(css(this.$el, "paddingLeft")) -
          parseInt(css(this.$el, "paddingRight"))
        : 0;
      const isMobile =
        wrapperWidth < contentWidth || clientWidth <= MQ_MOBILE_NARROW + 1;
      console.log("handler");
      if (isMobile !== this.isMobile) this.$emit("change", isMobile);
    };

    handler();
    window.addEventListener("resize", handler);
    window.addEventListener("orientationchange", handler);
  },
});
