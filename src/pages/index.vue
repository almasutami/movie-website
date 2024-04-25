<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { getMovieBackdrop } from 'utils/movie-backdrop'

const movieStore = useMovieStore()
const { moviesInLandingPage } = storeToRefs(movieStore)
const { listPopularMoviesForLandingPage } = useMovieStore()

onMounted(() => {
  listPopularMoviesForLandingPage()
})
</script>

<template>
  <nuxt-layout name="default-page-layout">
    <div
      class="lg:p-[100px] md:p-[80px] sm:p-[30px] p-[100px] text-black min-h-screen bg-no-repeat bg-cover bg-fixed bg-top"
      :style="
        'padding: 0 20px;' +
        `background-image: linear-gradient(to bottom, rgba(30,30,30,1), rgba(30,30,30,0)), url(${getMovieBackdrop(moviesInLandingPage?.[0]?.backdrop_path)});`
      "
    >
      <div />
    </div>
  </nuxt-layout>
</template>
