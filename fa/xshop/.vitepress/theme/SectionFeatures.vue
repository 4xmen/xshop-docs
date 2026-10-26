<script setup>
import { useData } from 'vitepress'
import VPFeatures from 'vitepress/dist/client/theme-default/components/VPFeatures.vue'

const { frontmatter } = useData()
</script>

<template>
  <VPFeatures v-if="frontmatter.features" :features="frontmatter.features" />
  <br>
</template>