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
    <div class="info-row">
      <span class="info-category" v-if="category">{{ category }}</span>
      <span class="info-divider" v-if="category && date"></span>
      <span class="info-date" v-if="date">{{ date }}</span>
    </div>
    <div class="info-tags" v-if="tags.length">
      <span class="info-tag" v-for="tag in tags" :key="tag">{{ tag }}</span>
    </div>
  </div>
</template>

<style scoped>
.article-info {
  margin-bottom: 32px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.info-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.info-category {
  display: inline-flex;
  align-items: center;
  padding: 3px 12px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  background: var(--vp-c-brand-1);
  color: #fff;
  letter-spacing: 0.02em;
}

.info-divider {
  width: 1px;
  height: 14px;
  background: var(--vp-c-divider);
}

.info-date {
  font-size: 0.84rem;
  color: var(--vp-c-text-3);
}

.info-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.info-tag {
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  border-radius: 4px;
  font-size: 0.76rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  transition: all 0.2s ease;
}

.info-tag:hover {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-soft);
  background: var(--vp-c-brand-soft);
}
</style>
