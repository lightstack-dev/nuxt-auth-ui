import MarkdownIt from 'markdown-it'

export default function useMarkdown() {
  const m = (message: string | undefined, renderOutline?: boolean) => {
    if (!message) return ''

    const mdIt = new MarkdownIt({ linkify: true, typographer: true })

    return renderOutline ? mdIt.render(message) : mdIt.renderInline(message)
  }

  return { m }
}
