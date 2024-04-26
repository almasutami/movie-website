<script setup lang="ts">
import TopNavigation from 'components/top-navigation.vue'
</script>

<template>
  <main class="h-full w-full no-scrollbar">
    <top-navigation />
    <slot />
  </main>
</template>
