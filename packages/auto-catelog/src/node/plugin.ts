import { createPage } from "@vuepress/core";
import { logger } from "./utils";

import type { Plugin, PluginConfig } from "@vuepress/core";
import type { AutoCatalogOptions } from "../shared";

export const autoCatalogPlugin: Plugin<AutoCatalogOptions> = (_options) => {
  return {
    name: "vuepress-plugin-auto-catalog",

    onInitialized: (app): Promise<void[]> => {
      const { pages } = app;

      return Promise.all(
        Array.from(
          // fliter dumplicate path
          new Set(
            ...pages
              .map(({ path: pagePath }) => {
                const temp = pagePath.split("/");

                temp.pop();

                const catalogPath = temp.join("/");

                if (pages.every(({ path }) => path !== catalogPath)) {
                  console.log(catalogPath, "needs to be generated");

                  if (app.env.isDebug)
                    logger.info(`Generating catalog ${catalogPath}}`);

                  return catalogPath;
                }

                return null;
              })
              .filter((item): item is string => item !== null)
          )
        ).map(async (catalogPath) => {
          app.pages.push(
            await createPage(app, {
              content: "<Catalog />",
              path: catalogPath,
            })
          );
        })
      );
    },
  };
};

export const autoCatalog = (
  options: AutoCatalogOptions | false
): PluginConfig<AutoCatalogOptions> => ["auto-catalog", options];
