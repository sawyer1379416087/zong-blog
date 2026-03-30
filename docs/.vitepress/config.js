export default {
  base: '/zong-blog/',
  title: '粽 | 技术博客',
  description: '分享后端、AI、编程学习笔记和技术心得',
  lastUpdated: true,
  cleanUrls: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/zong-blog/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#5b8af5' }],
    ['meta', { name: 'og:type', content: 'website' }],
  ],

  markdown: {
    lineNumbers: true,
  },

  themeConfig: {
    siteTitle: '粽的博客',
    logo: '/logo.svg',

    nav: [
      { text: '首页', link: '/' },
      {
        text: '分类',
        items: [
          { text: '建站', link: '/categories/building' },
          { text: 'AI', link: '/categories/ai' },
          { text: '后端', link: '/categories/backend' },
        ]
      },
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
      ],
      '/categories/': [
        {
          text: '文章分类',
          items: [
            { text: '建站', link: '/categories/building' },
            { text: 'AI', link: '/categories/ai' },
            { text: '后端', link: '/categories/backend' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/sawyer1379416087' },
    ],

    footer: {
      message: '用 VitePress 搭建 | 持续更新中',
      copyright: '© 2026 粽 | 技术博客',
    },

    outline: {
      level: [2, 3],
      label: '目录',
    },

    lastUpdated: {
      text: '最后更新于',
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
