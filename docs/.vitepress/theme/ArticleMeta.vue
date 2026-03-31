<script setup>
import { useData } from 'vitepress'
import { computed } from 'vue'

const { frontmatter } = useData()

const tags = computed(() => frontmatter.value.tags || [])
const rawDate = computed(() => frontmatter.value.date || '')
const category = computed(() => frontmatter.value.category || '')
const show = computed(() => rawDate.value || category.value || tags.value.length)

const date = computed(() => {
  if (!rawDate.value) return ''
  const d = new Date(rawDate.value)
  if (isNaN(d.getTime())) return String(rawDate.value)
  return d.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
})
</script>

<template>
  <div v-if="show" class="article-info">
    <div class="info-header">
      <span class="info-category" v-if="category">{{ category }}</span>
      <span class="info-date" v-if="date">{{ date }}</span>
    </div>
    <div class="info-tags" v-if="tags.length">
      <span class="info-tag" v-for="tag in tags" :key="tag">{{ tag }}</span>
    </div>
    <div class="info-rule"></div>
  </div>
</template>

<style scoped>
.article-info {
  margin-bottom: 36px;
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.info-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 14px;
}

.info-category {
  display: inline-flex;
  align-items: center;
  padding: 3px 14px;
  border-radius: 2px;
  font-size: 0.75rem;
  font-weight: 600;
  background: var(--vp-c-brand-1);
  color: #fff;
  letter-spacing: 0.06em;
  font-family: 'Noto Serif SC', serif;
}

.info-date {
  font-size: 0.82rem;
  color: var(--vp-c-text-3);
  font-family: 'Crimson Pro', serif;
  font-style: italic;
}

.info-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 20px;
}

.info-tag {
  display: inline-flex;
  align-items: center;
  padding: 2px 12px;
  border-radius: 2px;
  font-size: 0.72rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  transition: all 0.3s ease;
  letter-spacing: 0.02em;
}

.info-tag:hover {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.info-rule {
  width: 24px;
  height: 1px;
  background: var(--vp-c-brand-1);
  opacity: 0.4;
}
</style>
