import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "computing insecurities",
    pageTitleSuffix: " | sidbin",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "sidb.in",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "local",
      cdnCaching: false,
      typography: {
        header: "SF Pro Display",  // Will fallback to system fonts
        body: "SF Pro Text",       // Will fallback to system fonts
        code: "SF Mono",           // Will fallback to system monospace
      },
      colors: {
        lightMode: {
          light: "#fafafa",        // soft warm white (easier on eyes)
          lightgray: "#f1f1f1",    // warm light gray
          gray: "#737373",         // balanced gray
          darkgray: "#404040",     // readable dark gray
          dark: "#1a1a1a",         // soft black (not pure black)
          secondary: "#0066cc",    // refined blue
          tertiary: "#666666",     // balanced accent
          highlight: "rgba(0, 102, 204, 0.08)", // subtle blue highlight
          textHighlight: "#fff2cc88", // warm yellow highlight
        },
        darkMode: {
          light: "#181818",        // true dark (not black - easier on eyes)
          lightgray: "#252525",    // subtle dark gray
          gray: "#707070",         // balanced medium gray
          darkgray: "#b8b8b8",     // readable light gray
          dark: "#e8e8e8",         // soft white (not pure white)
          secondary: "#4f9eff",    // bright readable blue
          tertiary: "#888888",     // muted gray accent
          highlight: "rgba(79, 158, 255, 0.12)", // gentle blue highlight
          textHighlight: "#ffd54f66", // warm amber highlight
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
    ],
  },
}

export default config
