# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Quartz v4 repository - a static site generator for publishing digital gardens and notes as websites. Quartz transforms Markdown files into a fully-featured website with features like backlinks, graph visualization, search, and responsive design.

## Development Commands

### Core Commands

- `npm run quartz build` - Build the site for production
- `npm run quartz serve` - Build and serve the site locally with hot reloading
- `npm run quartz sync` - Sync content changes
- `npm run docs` - Build and serve documentation locally

### Code Quality

- `npm run check` - Run TypeScript type checking and Prettier formatting checks
- `npm run format` - Format code with Prettier
- `npm run test` - Run tests using tsx test runner

### Advanced

- `npm run profile` - Profile build performance with 0x

## Architecture Overview

### Core Structure

- `quartz/` - Main framework code containing all core functionality
- `content/` - User content directory for markdown files, posts, and assets
- `quartz.config.ts` - Main configuration file for site settings, plugins, and theme
- `quartz.layout.ts` - Layout configuration defining component placement and page structure

### Key Components

- **Plugins System**: Transformers, filters, and emitters that process content
  - Transformers: Process markdown content (syntax highlighting, frontmatter, etc.)
  - Filters: Filter content (remove drafts, etc.)
  - Emitters: Generate output files (pages, RSS, sitemap, etc.)
- **Components**: Preact-based UI components in `quartz/components/`
- **Build System**: ESBuild-based with TypeScript and SASS support

### Configuration Files

- `quartz.config.ts` - Primary configuration for site behavior, theming, and plugins
- `quartz.layout.ts` - Defines component layout for different page types
- `tsconfig.json` - TypeScript configuration with Preact JSX support

### Plugin Architecture

Quartz uses a three-stage plugin system:

1. **Transformers**: Modify content during processing (e.g., FrontMatter, SyntaxHighlighting)
2. **Filters**: Remove or modify content (e.g., RemoveDrafts)
3. **Emitters**: Generate final output files (e.g., ContentPage, Static assets)

### Content Processing

- Markdown files in `content/` are processed through the plugin pipeline
- Supports Obsidian-flavored markdown, GitHub-flavored markdown, and LaTeX
- Automatic date extraction from git, frontmatter, or filesystem
- Link resolution and graph generation for interconnected notes

### Build Process

The build process uses `quartz/build.ts` which:

1. Processes all markdown files through transformers
2. Applies filters to remove unwanted content
3. Runs emitters to generate the final static site
4. Handles asset copying and optimization

When developing, prefer using the existing plugin system rather than modifying core build logic. Custom functionality should be implemented as plugins when possible.

## Component System

### Component Architecture

Quartz uses a **constructor function** pattern for components. Each component:

- Is written in `.tsx` files in `quartz/components/`
- Exports a function that returns a `QuartzComponent`
- Accepts configuration options through the constructor
- Uses Preact for JSX rendering (not React - no hooks support)

### Component Structure

```typescript
export default ((userOpts?: Partial<Options>) => {
  const Component: QuartzComponent = (props: QuartzComponentProps) => {
    // Component logic and JSX
    return <div>...</div>
  }

  Component.css = styles           // Optional CSS
  Component.beforeDOMLoaded = script  // Optional pre-load script
  Component.afterDOMLoaded = script   // Optional post-load script

  return Component
}) satisfies QuartzComponentConstructor
```

### Key Component Props

- `fileData`: Current page data (frontmatter, content, slug, etc.)
- `cfg`: Global configuration from `quartz.config.ts`
- `allFiles`: Array of all site content for cross-references
- `tree`: AST tree of current content
- `displayClass`: CSS class for responsive display (`desktop-only`, `mobile-only`)

### Core Components

**Layout Components:**

- `Explorer`: File/folder tree navigation with collapsible folders
- `Search`: Full-text search with preview functionality
- `Graph`: Interactive D3.js graph showing page connections (local + global views)
- `TableOfContents`: Auto-generated TOC from headings (modern/legacy layouts)
- `Breadcrumbs`: Navigation path showing page hierarchy

**Content Components:**

- `ArticleTitle`: Displays page title from frontmatter or filename
- `ContentMeta`: Shows reading time, word count, tags
- `Backlinks`: Lists pages that link to current page
- `TagList`: Displays page tags as clickable links
- `RecentNotes`: Shows recently modified content

**UI Components:**

- `Darkmode`: Theme toggle with sun/moon icons
- `ReaderMode`: Toggle for distraction-free reading
- `Footer`: Customizable footer with social links
- `Comments`: Integration for comment systems

**Utility Components:**

- `Head`: HTML head elements, metadata, scripts
- `ConditionalRender`: Conditionally show components based on page data
- `Flex`: Layout component for responsive component arrangements
- `DesktopOnly`/`MobileOnly`: Responsive visibility wrappers
- `Spacer`: Adds visual spacing between components

### Component Configuration Examples

**Explorer Component:**

```typescript
Component.Explorer({
  folderDefaultState: "collapsed",
  folderClickBehavior: "link",
  useSavedState: true,
  sortFn: (a, b) => a.displayName.localeCompare(b.displayName),
  filterFn: (node) => node.slugSegment !== "tags",
})
```

**Graph Component:**

```typescript
Component.Graph({
  localGraph: {
    drag: true,
    zoom: true,
    depth: 1,
    repelForce: 0.5,
    centerForce: 0.3,
  },
  globalGraph: {
    depth: -1,
    scale: 0.9,
    focusOnHover: true,
    enableRadial: true,
  },
})
```

### Layout System

Components are placed in layouts defined in `quartz.layout.ts`:

- `beforeBody`: Above main content (breadcrumbs, title, meta)
- `left`: Left sidebar (search, explorer, navigation)
- `right`: Right sidebar (TOC, graph, backlinks)
- `afterBody`: Below content
- `footer`: Site footer

### Component Development Best Practices

- Use specific CSS class names to avoid global conflicts
- Handle responsive design with `displayClass` prop
- Use `OverflowList` for long lists that need truncation
- Track event handlers with `window.addCleanup()` for SPA navigation
- Leverage `allFiles` prop for site-wide functionality
- Use inline scripts (`.inline.ts`) for complex interactivity
- Re-export new components in `quartz/components/index.ts`
