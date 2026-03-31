import DefaultTheme from 'vitepress/theme'
import ArticleMeta from './ArticleMeta.vue'
import TagPage from './TagPage.vue'
import './custom.css'
import { h } from 'vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-before': () => h(ArticleMeta),
    })
  },
  enhanceApp({ app }) {
    app.component('TagPage', TagPage)
  },
}
