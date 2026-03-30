export default {
  // 网站标题（浏览器标签显示）
  title: '粽 | 技术博客',
  // 网站描述（搜索引擎收录用）
  description: '分享后端、AI、编程学习笔记和技术心得',

  // 头部图标（可选，可跳过，后续可添加）
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }]
  ],

  // 主题配置（核心：导航栏、侧边栏等）
  themeConfig: {
    // 左上角显示的博客名称
    siteTitle: '我的技术博客',

    // 导航栏（顶部菜单）
    nav: [
      { text: '首页', link: '/' },
      { text: '技术文章', link: '/posts/' },
      { text: '我的GitHub', link: 'https://github.com/sawyer1379416087' }, // 替换成自己的GitHub地址
    ],

    // 侧边栏（文章分类，和我们的文章结构对应）
    sidebar: [
      {
        text: '技术文章', // 侧边栏标题
        items: [
          // 第一篇文章：VitePress 搭建教程
          { text: 'VitePress 搭建教程', link: '/posts/vitepress-guide/' }
        ]
      }
    ],

    // 社交链接（右下角）
    socialLinks: [
      { icon: 'github', link: 'https://github.com/sawyer1379416087' } // 替换成自己的GitHub地址
    ],

    // 页脚（底部版权信息）
    footer: {
      copyright: '© 2026 你的名字 | 技术博客，免费分享技术心得' // 替换成自己的名字
    },

    // 开启暗黑模式（默认支持，无需额外配置）
    darkMode: true,

    // 代码高亮（默认支持，无需额外配置）
    highlight: {
      theme: 'github-dark'
    }
  }
}`