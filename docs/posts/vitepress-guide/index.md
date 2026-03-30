---
title: 用 VitePress 从零搭建个人博客
date: 2026-03-30
category: 建站
tags:
  - VitePress
  - Vue
  - 博客
---

# 用 VitePress 从零搭建个人博客

最近折腾了一下个人博客，选了 VitePress 来搭建。用下来感觉确实很丝滑——构建快、配置少、写 Markdown 就能发布，很适合技术写作。这篇记录一下整个搭建过程，方便后面回顾，也分享给有同样需求的朋友。

## 为什么选 VitePress

市面上静态博客工具不少，Hexo、Hugo、Jekyll、Docusaurus 都用过或了解过。最后选 VitePress 主要是这几点：

- **快**。Vite 驱动，开发热更新几乎无感。
- **简单**。不需要复杂的配置，写 Markdown 就行。
- **Vue 生态**。如果你熟悉 Vue，想自定义什么都很方便。
- **开箱即用的暗黑模式、搜索、代码高亮**。

如果你只是想写写技术文章，不想在工具链上花太多时间，VitePress 是个很好的选择。

## 环境准备

需要提前装好 [Node.js](https://nodejs.org/)（建议 18+），用 LTS 版本就行。

```bash
node -v   # 确认安装成功
npm -v
```

## 初始化项目

```bash
mkdir my-blog && cd my-blog
npm init -y
npm install -D vitepress
```

然后在 `package.json` 里加上脚本：

```json
{
  "scripts": {
    "dev": "vitepress dev docs",
    "build": "vitepress build docs",
    "preview": "vitepress preview docs"
  }
}
```

创建文档目录和首页：

```bash
mkdir docs
```

在 `docs/index.md` 里写点内容：

```markdown
---
layout: home
hero:
  name: "我的博客"
  tagline: 记录技术成长的地方
---
```

跑起来看看：

```bash
npm run dev
```

打开 `http://localhost:5173` 就能看到你的博客了。

## 配置文件

在 `docs/.vitepress/config.js` 里写配置：

```js
export default {
  title: '我的博客',
  description: '技术笔记与分享',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/posts/' }
    ],
    sidebar: [
      {
        text: '文章',
        items: [
          { text: '第一篇', link: '/posts/first-post/' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/你的用户名' }
    ]
  }
}
```

导航栏、侧边栏、社交链接都在这里配。VitePress 的配置很直觉，基本看字段名就知道是干什么的。

## 写文章

在 `docs/posts/` 下建文件夹，每篇文章一个目录：

```
docs/
  posts/
    first-post/
      index.md
    second-post/
      index.md
```

文章开头加上 frontmatter：

```markdown
---
title: 文章标题
date: 2026-03-30
---

# 文章标题

正文内容...
```

VitePress 原生支持 Markdown 的所有语法，代码块、表格、链接都正常用。

## 给文章打标签和分类

我给博客做了一套标签+分类系统，原理很简单：利用 Markdown 的 frontmatter 字段 + 自定义 Vue 组件自动渲染。

### 文章 frontmatter 写法

每篇文章开头这样写就行：

```markdown
---
title: 你的文章标题
date: 2026-03-30
category: 后端
tags:
  - Go
  - 微服务
  - Redis
---
```

- `category` 是分类，写一个就好（比如：建站、AI、后端、学习）
- `tags` 是标签列表，随便写几个都行，会以小药丸样式显示在文章顶部
- `date` 是发布日期

写完之后你不需要做别的，自定义主题里的 `ArticleMeta.vue` 组件会自动读取这些字段并渲染到页面上。

### 新增分类

如果已有的分类不够用，想新增一个，分三步：

**第一步**：在 `docs/categories/` 下新建一个 Markdown 文件，比如 `devops.md`：

```markdown
# DevOps

CI/CD、容器化、云原生相关的文章。

## 文章列表

- [你的文章标题](/posts/your-article/)
```

**第二步**：在 `docs/.vitepress/config.js` 里把新分类加到导航和侧边栏：

```js
// nav 里加
{ text: '🔧 DevOps', link: '/categories/devops' }

// sidebar '/posts/' 里加
{
  text: '🔧 DevOps',
  collapsed: true,
  items: [
    { text: '文章标题', link: '/posts/your-article/' }
  ]
}

// sidebar '/categories/' 里加
{ text: '🔧 DevOps', link: '/categories/devops' }
```

**第三步**：如果首页也要展示，在 `docs/index.md` 的 features 里加一项。

就这三步，新分类就有了。

### 新增标签

标签不需要额外创建文件——在文章的 frontmatter 里写什么 tag 就自动展示什么 tag。想加新标签直接往 `tags` 列表里写就行，没有限制。

## 部署到 GitHub Pages

这是最后一步，让你的博客能被别人访问到。

### 1. 创建 GitHub 仓库

在 GitHub 上新建一个仓库（比如叫 `my-blog`），然后推送代码：

```bash
git init
git add -A
git commit -m "init blog"
git remote add origin git@github.com:你的用户名/my-blog.git
git push -u origin main
```

### 2. 添加 base 路径

如果仓库名不是 `<用户名>.github.io`，需要在 `config.js` 里加上 `base`：

```js
export default {
  base: '/my-blog/',
  // ...其他配置
}
```

### 3. 添加 GitHub Actions 工作流

在项目根目录创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npm install
      - run: npm run build
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

### 4. GitHub 上的设置

推送后，去仓库的 **Settings → Pages**，把 Source 改为 **GitHub Actions**。

之后每次 push 到 main 分支，博客就会自动构建和部署。

## 最后

整个流程下来大概半小时就能搞定。VitePress 的好处是你不需要关心太多配置细节，专注写内容就行。后面想加自定义样式、组件什么的，也都有 Vue 的底子在，扩展性不错。

有问题欢迎留言交流。
