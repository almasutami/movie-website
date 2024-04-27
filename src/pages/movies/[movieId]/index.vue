<script setup lang="ts">
const route = useRoute()

const movieId = route.params.movieId
</script>

<template>This movie details page for {{ movieId }}</template>
