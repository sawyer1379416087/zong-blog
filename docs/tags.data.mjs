import { createContentLoader } from 'vitepress'

export default createContentLoader('posts/*/index.md', {
  transform(rawData) {
    return rawData
      .map(({ url, frontmatter }) => ({
        title: frontmatter.title || '',
        url,
        date: frontmatter.date || '',
        category: frontmatter.category || '',
        tags: frontmatter.tags || [],
      }))
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  }
})
