import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, resolveRelative } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { byDateAndAlphabetical } from "./PageList"
import { Date, getDate } from "./Date"
import { GlobalConfiguration } from "../cfg"
import { classNames } from "../util/lang"
import style from "./styles/stackedNotes.scss"

interface Options {
  title?: string
  limit?: number
  showTags: boolean
  showDescription: boolean
  filter: (f: QuartzPluginData) => boolean
  sort: (f1: QuartzPluginData, f2: QuartzPluginData) => number
}

const defaultOptions = (cfg: GlobalConfiguration): Options => ({
  limit: undefined, // Show all posts by default
  showTags: true,
  showDescription: false,
  filter: (f) => {
    // Filter out index pages and include posts and technical content
    const slug = f.slug || ""
    return (
      slug !== "index" &&
      (slug.startsWith("posts/") || slug.startsWith("technical/")) &&
      f.frontmatter?.title !== undefined
    )
  },
  sort: byDateAndAlphabetical(cfg),
})

export default ((userOpts?: Partial<Options>) => {
  const StackedNotes: QuartzComponent = ({
    allFiles,
    fileData,
    displayClass,
    cfg,
  }: QuartzComponentProps) => {
    const opts = { ...defaultOptions(cfg), ...userOpts }
    const posts = allFiles.filter(opts.filter).sort(opts.sort)
    const displayPosts = opts.limit ? posts.slice(0, opts.limit) : posts

    return (
      <div class={classNames(displayClass, "stacked-notes")}>
        {opts.title && <h2>{opts.title}</h2>}
        <div class="posts-container">
          {displayPosts.map((post) => {
            const title = post.frontmatter?.title ?? "Untitled"
            const tags = post.frontmatter?.tags ?? []
            const description = post.frontmatter?.description || post.description

            return (
              <article class="post-entry">
                <div class="post-header">
                  <h3 class="post-title">
                    <a href={resolveRelative(fileData.slug!, post.slug!)} class="internal">
                      {title}
                    </a>
                  </h3>
                  {post.dates && (
                    <time class="post-date">
                      <Date date={getDate(cfg, post)!} locale={cfg.locale} />
                    </time>
                  )}
                </div>

                {opts.showDescription && description && (
                  <p class="post-description">{description}</p>
                )}

                {opts.showTags && tags.length > 0 && (
                  <div class="post-tags">
                    {tags.map((tag) => (
                      <a
                        class="tag-link"
                        href={resolveRelative(fileData.slug!, `tags/${tag}` as FullSlug)}
                      >
                        #{tag}
                      </a>
                    ))}
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </div>
    )
  }

  StackedNotes.css = style
  return StackedNotes
}) satisfies QuartzComponentConstructor
