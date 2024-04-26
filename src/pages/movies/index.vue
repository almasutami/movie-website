<script setup lang="ts">
import { storeToRefs } from 'pinia'
import CardRender from 'components/card-render.vue'

const movieStore = useMovieStore()
const { moviesInDiscoverPage } = storeToRefs(movieStore)
const { discoverMovies } = useMovieStore()

onMounted(() => {
  discoverMovies('')
})
</script>

<template>
  <nuxt-layout name="default-page-layout">
    <!-- list all movies -->
    <div
      class="bg-[rgba(30,30,30,1)] min-h-screen pb-5 md:pt-40 pt-32 text-white"
    >
      <card-render
        mode="full-page"
        :movies="moviesInDiscoverPage"
        type="movies"
      />
    </div>
  </nuxt-layout>
</template>
