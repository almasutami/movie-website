<script setup lang="ts">
import type { MovieVideo, Cast, Movie } from 'stores/movies.store'
import { getMovieBackdrop } from 'utils/backdrop-poster'

const route = useRoute()
const movieStore = useMovieStore()
const { listMovieLoading, currentMovie } = storeToRefs(movieStore)
const { getMovieById, getMovieVideos, getMovieCast, getSimilarMovies } =
  useMovieStore()

const movieId = route.params.movieId as unknown as number

const thisMovieVideos = ref<MovieVideo[]>([])
const thisMovieCasts = ref<Cast[]>([])
const thisMovieSimilars = ref<Movie[]>([])

onMounted(async () => {
  await getMovieById(movieId)
  const response = await getMovieVideos(movieId)
  if (response?.results) {
    thisMovieVideos.value = response.results
  }
  const responseCast = await getMovieCast(movieId)
  if (responseCast) {
    thisMovieCasts.value = responseCast
  }
  const responseSimilar = await getSimilarMovies(movieId)
  if (responseCast) {
    thisMovieSimilars.value = responseSimilar
  }
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
        <div
          class="flex flex-col md:flex-row gap-16 w-full lg:min-h-[60vh] md:min-h-[40vh] min-h-[20vh] px-6 md:px-16 lg:px-20 md:pt-40 pt-32"
        >
          <!-- featured banner -->
          <div
            class="flex flex-col gap-2 align-middle text-white w-full md:w-1/2"
          >
            <div
              class="text-large lg:text-3xl md:text-3xl font-bold drop-shadow-md"
            >
              <div v-if="!listMovieLoading">{{ currentMovie?.title }}</div>
              <u-skeleton v-else class="h-24 opacity-50" />
            </div>

            <div
              class="text-xs lg:text-sm w-3/4 drop-shadow-md"
              v-if="!listMovieLoading"
            >
              <div v-if="!listMovieLoading">{{ currentMovie?.overview }}</div>
            </div>

            <!-- genres -->
            <div
              v-if="!listMovieLoading && !listMovieLoading"
              class="flex flex-row gap-2 items-center text-sm lg:text-base"
            >
              <div v-for="genre in currentMovie?.genres" :key="genre.id">
                <u-badge color="black" variant="solid">{{
                  genre?.name
                }}</u-badge>
              </div>
            </div>

            <!-- rating , runtime, language -->
            <div
              class="flex flex-row gap-2 items-center text-sm lg:text-base"
              v-if="!listMovieLoading"
            >
              <div class="flex flex-row gap-2 items-center cursor-default">
                <u-button
                  icon="i-heroicons-star-solid"
                  variant="solid"
                  color="yellow"
                  :label="`${currentMovie?.vote_average?.toFixed(1)} / 10`"
                />
              </div>

              <div class="flex flex-row gap-2 items-center cursor-default">
                <base-button
                  icon="i-heroicons-clock"
                  button-style="primary"
                  :label="`${currentMovie?.runtime}`"
                />
              </div>
              <div class="flex flex-row gap-2 items-center cursor-default">
                <base-button
                  button-style="primary"
                  :label="`${currentMovie?.original_language?.toUpperCase()}`"
                />
              </div>
            </div>
          </div>
          <!-- videos -->
          <div class="w-1/2 h-full">
            <ClientOnly>
              <vue-plyr>
                <div class="plyr__video-embed h-full">
                  <iframe
                    :src="`https://www.youtube.com/embed/${thisMovieVideos?.[0]?.key}?amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1`"
                    allowfullscreen
                    allowtransparency
                    allow="autoplay"
                    class="h-full"
                  >
                  </iframe>
                </div>
              </vue-plyr>
            </ClientOnly>
          </div>
        </div>

        <!-- transition -->
        <div
          class="h-16"
          :style="`background-image: linear-gradient(to top, rgba(30,30,30,1), rgba(30,30,30,0));`"
        />
      </div>

      <!-- cast -->
      <div class="bg-[rgba(30,30,30,1)] min-h-[40vh] pb-5">
        <card-render
          :casts="thisMovieCasts"
          :loading="listMovieLoading"
          mode="slider"
          type="casts"
        />
      </div>

      <!-- related movies -->
      <div class="bg-[rgba(30,30,30,1)] min-h-[40vh] pb-5">
        <card-render
          label="Related Movies"
          :movies="thisMovieSimilars"
          :loading="listMovieLoading"
          mode="slider"
          type="movies"
        />
      </div>
    </div>
  </nuxt-layout>
</template>
