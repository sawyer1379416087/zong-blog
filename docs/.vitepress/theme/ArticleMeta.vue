<script setup>
import { useData } from 'vitepress'
import { computed } from 'vue'

const { frontmatter, page } = useData()

const title = computed(() => frontmatter.value.title || '')
const tags = computed(() => frontmatter.value.tags || [])
const date = computed(() => frontmatter.value.date || '')
const category = computed(() => frontmatter.value.category || '')
const show = computed(() => title.value && (date.value || category.value || tags.value.length))
</script>

<template>
  <div v-if="show" class="article-hero">
    <div class="article-hero-bg"></div>
    <div class="article-hero-content">
      <div class="article-hero-meta">
        <span class="hero-category" v-if="category">{{ category }}</span>
        <span class="hero-date" v-if="date">{{ date }}</span>
      </div>
      <h1 class="article-hero-title">{{ title }}</h1>
      <div class="article-hero-tags" v-if="tags.length">
        <span class="hero-tag" v-for="tag in tags" :key="tag"># {{ tag }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.article-hero {
  position: relative;
  margin: -24px -24px 32px;
  padding: 48px 32px 40px;
  border-radius: 0 0 20px 20px;
  overflow: hidden;
}

@media (min-width: 960px) {
  .article-hero {
    margin: -32px -32px 40px;
    padding: 56px 40px 48px;
  }
}

.article-hero-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #646cff 0%, #8b5cf6 40%, #c084fc 70%, #f472b6 100%);
  opacity: 0.08;
  z-index: 0;
}

.dark .article-hero-bg {
  opacity: 0.12;
}

.article-hero::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #646cff, #c084fc, #f472b6, #646cff);
  background-size: 300% 100%;
  animation: gradientFlow 6s linear infinite;
}

@keyframes gradientFlow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.article-hero-content {
  position: relative;
  z-index: 1;
}

.article-hero-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.hero-category {
  display: inline-flex;
  align-items: center;
  padding: 4px 14px;
  border-radius: 100px;
  font-size: 0.8rem;
  font-weight: 600;
  background: var(--vp-c-brand-1);
  color: #fff;
  letter-spacing: 0.02em;
}

.hero-date {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  opacity: 0.7;
}

.hero-date::before {
  content: '📅 ';
}

.article-hero-title {
  font-size: 2rem;
  font-weight: 800;
  line-height: 1.3;
  letter-spacing: -0.02em;
  margin: 0;
  background: linear-gradient(135deg, var(--vp-c-text-1) 0%, var(--vp-c-brand-1) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

@media (min-width: 640px) {
  .article-hero-title {
    font-size: 2.4rem;
  }
}

.article-hero-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 20px;
}

.hero-tag {
  display: inline-flex;
  align-items: center;
  padding: 5px 16px;
  border-radius: 100px;
  font-size: 0.82rem;
  font-weight: 500;
  background: rgba(100, 108, 255, 0.1);
  color: var(--vp-c-brand-1);
  border: 1px solid rgba(100, 108, 255, 0.15);
  transition: all 0.25s ease;
  cursor: default;
  backdrop-filter: blur(4px);
}

.hero-tag:hover {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(100, 108, 255, 0.25);
}
</style>
