<script setup lang="ts">
const route = useRoute()

const tvSeriesId = route.params.tvSeriesId
</script>

<template>This is tv series details page for {{ tvSeriesId }}</template>
