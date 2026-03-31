export default {
  base: '/zong-blog/',
  title: '粽 | 技术博客',
  description: '分享后端、AI、编程学习笔记和技术心得',
  lastUpdated: true,
  cleanUrls: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/zong-blog/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#3C2415' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', {
      href: 'https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&family=Noto+Serif+SC:wght@400;500;600;700;900&family=JetBrains+Mono:wght@400;500;600&display=swap',
      rel: 'stylesheet'
    }],
  ],

  markdown: {
    lineNumbers: true,
  },

  themeConfig: {
    siteTitle: '粽的博客',

    nav: [
      { text: '首页', link: '/' },
      {
        text: '分类',
        items: [
          { text: '建站', link: '/categories/building' },
          { text: 'AI', link: '/categories/ai' },
          { text: '后端', link: '/categories/backend' },
          { text: '学习', link: '/categories/learning' },
        ]
      },
      { text: '标签', link: '/tags' },
      { text: 'GitHub', link: 'https://github.com/sawyer1379416087' },
    ],

    sidebar: {
      '/posts/': [
        {
          text: '建站',
          collapsed: false,
          items: [
            { text: 'VitePress 搭建个人博客', link: '/posts/vitepress-guide/' },
          ]
        },
        {
          text: 'AI',
          collapsed: true,
          items: []
        },
        {
          text: '后端',
          collapsed: true,
          items: []
        },
        {
          text: '学习',
          collapsed: true,
          items: []
        },
      ],
      '/categories/': [
        {
          text: '文章分类',
          items: [
            { text: '建站', link: '/categories/building' },
            { text: 'AI', link: '/categories/ai' },
            { text: '后端', link: '/categories/backend' },
            { text: '学习', link: '/categories/learning' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/sawyer1379416087' },
    ],

    footer: {
      message: '以墨为引 · 以码为笔',
      copyright: '© 2026 粽 · All rights reserved',
    },

    outline: {
      level: [2, 3],
      label: '本页目录',
    },

    lastUpdated: {
      text: '最后更新',
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
  },
}
