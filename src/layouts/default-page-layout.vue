<script setup lang="ts">
import TopNavigation from 'components/top-navigation.vue'
</script>

<template>
  <main class="h-full w-full">
    <top-navigation />
    <slot />
  </main>
</template>
