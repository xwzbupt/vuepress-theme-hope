import type { ConvertLocaleConfig } from "@mr-hope/vuepress-shared";

export interface BackToTopLocaleData {
  /**
   * Back to top button label text
   *
   * 返回顶部文字
   */
  backToTop: string;
}

export type BackToTopLocaleConfig = ConvertLocaleConfig<BackToTopLocaleData>;
