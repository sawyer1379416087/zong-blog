<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, withBase } from 'vitepress'
import { data as posts } from '../../tags.data.mjs'

const route = useRoute()
const activeTag = ref('')

function getTagFromUrl() {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search)
    return params.get('tag') || ''
  }
  return ''
}

onMounted(() => {
  activeTag.value = getTagFromUrl()
  window.addEventListener('popstate', () => {
    activeTag.value = getTagFromUrl()
  })
})

const allTags = computed(() => {
  const tagMap = {}
  posts.forEach(post => {
    post.tags.forEach(tag => {
      if (!tagMap[tag]) tagMap[tag] = 0
      tagMap[tag]++
    })
  })
  return Object.entries(tagMap)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }))
})

const filteredPosts = computed(() => {
  if (!activeTag.value) return posts
  return posts.filter(p => p.tags.includes(activeTag.value))
})

function selectTag(tag) {
  if (activeTag.value === tag) {
    activeTag.value = ''
    history.pushState(null, '', window.location.pathname)
  } else {
    activeTag.value = tag
    history.pushState(null, '', `?tag=${encodeURIComponent(tag)}`)
  }
}

function formatDate(raw) {
  if (!raw) return ''
  const d = new Date(raw)
  if (isNaN(d.getTime())) return String(raw)
  return d.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

<template>
  <div class="tag-page">
    <div class="tag-header">
      <h1 class="tag-title">标签</h1>
      <p class="tag-desc" v-if="!activeTag">共 {{ allTags.length }} 个标签，{{ posts.length }} 篇文章</p>
      <p class="tag-desc" v-else>
        「{{ activeTag }}」下共 {{ filteredPosts.length }} 篇文章
        <a class="tag-clear" @click.prevent="selectTag(activeTag)">查看全部</a>
      </p>
    </div>

    <div class="tag-cloud">
      <button
        v-for="tag in allTags"
        :key="tag.name"
        :class="['tag-pill', { active: activeTag === tag.name }]"
        @click="selectTag(tag.name)"
      >
        {{ tag.name }}
        <span class="tag-count">{{ tag.count }}</span>
      </button>
    </div>

    <div class="tag-rule"></div>

    <div class="tag-posts">
      <a
        v-for="post in filteredPosts"
        :key="post.url"
        :href="post.url"
        class="tag-post-card"
      >
        <div class="post-title">{{ post.title }}</div>
        <div class="post-meta">
          <span class="post-category" v-if="post.category">{{ post.category }}</span>
          <span class="post-date" v-if="post.date">{{ formatDate(post.date) }}</span>
        </div>
        <div class="post-tags">
          <span
            v-for="t in post.tags"
            :key="t"
            :class="['post-tag', { highlighted: t === activeTag }]"
          >{{ t }}</span>
        </div>
      </a>
    </div>

    <div v-if="filteredPosts.length === 0 && allTags.length > 0" class="tag-empty">
      暂无匹配的文章
    </div>
  </div>
</template>

<style scoped>
.tag-page {
  max-width: 740px;
  margin: 0 auto;
  padding: 48px 24px 80px;
}

.tag-header {
  margin-bottom: 32px;
}

.tag-title {
  font-family: 'Noto Serif SC', serif;
  font-weight: 900;
  font-size: 2rem;
  letter-spacing: 0.04em;
  color: var(--vp-c-text-1);
  margin: 0 0 8px;
}

.tag-desc {
  font-size: 0.88rem;
  color: var(--vp-c-text-3);
  margin: 0;
}

.tag-clear {
  color: var(--z-cinnabar, #C23B22);
  cursor: pointer;
  margin-left: 8px;
  border-bottom: 1px dashed;
  font-size: 0.84rem;
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 32px;
}

.tag-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 14px;
  border-radius: 2px;
  font-size: 0.82rem;
  font-weight: 500;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-elev, var(--vp-c-bg-soft));
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Noto Serif SC', serif;
}

.tag-pill:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.tag-pill.active {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
}

.tag-pill.active .tag-count {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
}

.tag-count {
  font-size: 0.68rem;
  padding: 1px 6px;
  border-radius: 2px;
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-3);
  font-family: 'Crimson Pro', serif;
}

.tag-rule {
  width: 32px;
  height: 1px;
  background: var(--vp-c-brand-1);
  opacity: 0.3;
  margin-bottom: 32px;
}

.tag-posts {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.tag-post-card {
  display: block;
  padding: 20px 24px;
  border-radius: 4px;
  background: var(--vp-c-bg-elev, var(--vp-c-bg-soft));
  border: 1px solid var(--vp-c-divider);
  text-decoration: none !important;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  color: inherit !important;
  position: relative;
}

.tag-post-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--z-cinnabar, #C23B22);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.tag-post-card:hover {
  transform: translateX(6px);
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 24px rgba(60, 36, 21, 0.06);
}

.tag-post-card:hover::before {
  opacity: 1;
}

.post-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  font-family: 'Noto Serif SC', serif;
  margin-bottom: 8px;
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

.post-category {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 2px 10px;
  border-radius: 2px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.post-date {
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
  font-family: 'Crimson Pro', serif;
  font-style: italic;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.post-tag {
  font-size: 0.7rem;
  padding: 2px 10px;
  border-radius: 2px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-3);
  border: 1px solid var(--vp-c-divider);
  transition: all 0.2s ease;
}

.post-tag.highlighted {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

.tag-empty {
  text-align: center;
  padding: 48px 0;
  color: var(--vp-c-text-3);
  font-style: italic;
  font-family: 'Noto Serif SC', serif;
}

@media (max-width: 768px) {
  .tag-page {
    padding: 32px 16px 64px;
  }

  .tag-title {
    font-size: 1.5rem;
  }
}
</style>
