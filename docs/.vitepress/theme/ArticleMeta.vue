<script setup>
import { useData } from 'vitepress'
import { computed } from 'vue'

const { frontmatter } = useData()

const tags = computed(() => frontmatter.value.tags || [])
const date = computed(() => frontmatter.value.date || '')
const category = computed(() => frontmatter.value.category || '')
const show = computed(() => date.value || category.value || tags.value.length)
</script>

<template>
  <div v-if="show" class="article-meta-wrapper">
    <div class="article-meta">
      <span class="date" v-if="date">{{ date }}</span>
      <span class="category" v-if="category">{{ category }}</span>
    </div>
    <div class="article-tags" v-if="tags.length">
      <span class="article-tag" v-for="tag in tags" :key="tag"># {{ tag }}</span>
    </div>
  </div>
</template>
