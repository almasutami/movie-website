<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { getMovieBackdrop } from 'utils/movie-backdrop'

const movieStore = useMovieStore()
const { moviesInLandingPage } = storeToRefs(movieStore)
const { listPopularMoviesForLandingPage } = useMovieStore()

onMounted(() => {
  listPopularMoviesForLandingPage()
})

const featuredMovie = computed(() => moviesInLandingPage.value?.[0])
const popularMovies = computed(() => moviesInLandingPage.value.slice(1))
</script>

<template>
  <nuxt-layout name="default-page-layout">
    <div
      class="h-full bg-no-repeat bg-cover bg-fixed bg-top"
      :style="`background-image: linear-gradient(to bottom, rgba(30,30,30,1), rgba(30,30,30,0), rgba(30,30,30,1)), url(${getMovieBackdrop(featuredMovie?.backdrop_path)});`"
    >
      <div
        class="h-full w-full"
        :style="`background-image: linear-gradient(to top right, rgba(30,30,30,0.7), rgba(30,30,30,0.2));`"
      >
        <!-- featured banner -->
        <div
          class="w-full h-[70vh] flex flex-col gap-2 align-middle text-white py-16 lg:p-[100px] md:p-[80px] p-[30px]"
        >
          <div
            class="text-3xl lg:text-5xl md:text-4xl font-bold drop-shadow-md"
          >
            {{ featuredMovie?.title }}
          </div>
          <div class="text-base lg:text-2xl md:text-lg drop-shadow-md">
            {{ featuredMovie?.tagline }}
          </div>
          <div
            class="text-sm lg:text-lg md:text-base w-3/4 lg:w-1/2 drop-shadow-md"
          >
            {{ featuredMovie?.overview }}
          </div>
          <!-- rating, genre -->
          <!-- see more button -->
        </div>
        <!-- transition -->
        <div
          class="h-16"
          :style="`background-image: linear-gradient(to top, rgba(30,30,30,1), rgba(30,30,30,0));`"
        />
      </div>
    </div>

    <!-- popular movies -->
    <div class="bg-[rgba(30,30,30,1)]">
      {{ popularMovies }}
    </div>
  </nuxt-layout>
</template>
