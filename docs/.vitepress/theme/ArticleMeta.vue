<script setup>
import { useData } from 'vitepress'
import { computed } from 'vue'

const { frontmatter } = useData()

const tags = computed(() => frontmatter.value.tags || [])
const date = computed(() => frontmatter.value.date || '')
const category = computed(() => frontmatter.value.category || '')
</script>

<template>
  <div v-if="date || category || tags.length" class="article-meta-wrapper">
    <div class="article-meta" v-if="date || category">
      <span class="date" v-if="date">{{ date }}</span>
      <span class="category" v-if="category">{{ category }}</span>
    </div>
    <div class="article-tags" v-if="tags.length">
      <span class="article-tag" v-for="tag in tags" :key="tag"># {{ tag }}</span>
    </div>
  </div>
</template>

<style scoped>
.article-meta-wrapper {
  margin: -4px 0 28px;
}
</style>
