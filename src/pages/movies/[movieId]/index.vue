<script setup lang="ts">
import { getMovieBackdrop } from 'utils/backdrop-poster'

const route = useRoute()
const movieStore = useMovieStore()
const { listMovieLoading, currentMovie } = storeToRefs(movieStore)
const { getMovieById } = useMovieStore()

const movieId = route.params.movieId as unknown as number

onMounted(async () => {
  await getMovieById(movieId)
})
</script>

<template>
  <nuxt-layout name="default-page-layout">
    <div
      class="h-full bg-no-repeat bg-cover bg-fixed bg-top"
      :style="
        !listMovieLoading
          ? `background-image: linear-gradient(to bottom, rgba(30,30,30,1), rgba(30,30,30,0), rgba(30,30,30,1)), url(${getMovieBackdrop(currentMovie?.backdrop_path as string)});`
          : 'bg-[rgba(30,30,30,1)]'
      "
    >
      <div
        class="h-full w-full"
        :style="`background-image: linear-gradient(to top right, rgba(30,30,30,0.7), rgba(30,30,30,0.2));`"
      >
        <!-- featured banner -->
        <div
          class="w-full lg:min-h-[60vh] md:min-h-[40vh] min-h-[20vh] flex flex-col gap-2 align-middle text-white px-6 md:px-16 lg:px-20 md:pt-40 pt-32"
        >
          <div
            class="text-3xl lg:text-5xl md:text-4xl font-bold drop-shadow-md"
          >
            <div v-if="!listMovieLoading">{{ currentMovie?.title }}</div>
            <u-skeleton v-else class="h-24 opacity-50" />
          </div>

          <div
            class="text-sm lg:text-lg md:text-base w-3/4 lg:w-1/2 drop-shadow-md"
            v-if="!listMovieLoading"
          >
            <div v-if="!listMovieLoading">{{ currentMovie?.overview }}</div>
          </div>

          <!-- genres -->
          <div
            v-if="!listMovieLoading && !listMovieLoading"
            class="flex flex-row gap-2 items-center"
          >
            <div v-for="genre in currentMovie?.genres" :key="genre.id">
              <u-badge color="black" variant="solid">{{ genre?.name }}</u-badge>
            </div>
          </div>

          <!-- rating -->
          <div
            class="flex flex-row gap-2 items-center my-2"
            v-if="!listMovieLoading"
          >
            <u-button
              class="!p-0"
              icon="i-heroicons-star-solid"
              variant="link"
              color="yellow"
            />
            <div>{{ currentMovie?.vote_average?.toFixed(1) }} / 10</div>
          </div>
        </div>
        <!-- transition -->
        <div
          class="h-16"
          :style="`background-image: linear-gradient(to top, rgba(30,30,30,1), rgba(30,30,30,0));`"
        />
      </div>

      <!-- trailer -->
      <div></div>
    </div>
  </nuxt-layout>
</template>
