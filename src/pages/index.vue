<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { getMovieBackdrop } from 'utils/movie-backdrop'
import CardRender from 'components/card-render.vue'

const movieStore = useMovieStore()
const { moviesInLandingPage, listMovieGenreLoading, genres } =
  storeToRefs(movieStore)
const { listPopularMoviesForLandingPage, getGenreName, fetchAllMovieGenres } =
  useMovieStore()
const tvSeriesStore = useTvSeriesStore()
const { tvSeriesInLandingPage } = storeToRefs(tvSeriesStore)
const { listPopularTvSeriesForLandingPage } = useTvSeriesStore()

onMounted(async () => {
  await fetchAllMovieGenres()
  await listPopularMoviesForLandingPage()
  await listPopularTvSeriesForLandingPage()
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
          class="w-full lg:min-h-[60vh] md:min-h-[40vh] min-h-[20vh] flex flex-col gap-2 align-middle text-white px-6 md:px-16 lg:px-20 md:pt-40 pt-32"
        >
          <div
            class="text-3xl lg:text-5xl md:text-4xl font-bold drop-shadow-md"
          >
            {{ featuredMovie?.title }}
          </div>
          <div
            class="text-sm lg:text-lg md:text-base w-3/4 lg:w-1/2 drop-shadow-md"
          >
            {{ featuredMovie?.overview }}
          </div>
          <!-- genres -->
          <div
            v-if="!listMovieGenreLoading"
            class="flex flex-row gap-2 items-center"
          >
            <div
              v-for="genreId of featuredMovie?.genre_ids?.slice(0, 3)"
              :key="genreId"
            >
              <u-badge color="black" variant="solid">{{
                getGenreName(genreId)
              }}</u-badge>
            </div>
            <div v-if="featuredMovie?.genre_ids?.length > 3">
              <u-badge color="black" variant="solid">more +</u-badge>
            </div>
          </div>
          <div v-else>
            <u-skeleton class="w-20 h-6" />
          </div>

          <!-- rating -->
          <div class="flex flex-row gap-2 items-center my-2">
            <!-- details button -->
            <base-button
              icon="i-heroicons-information-circle"
              buttonStyle="primary"
              label="See details"
            />
            <u-button
              class="!p-0"
              icon="i-heroicons-star-solid"
              variant="link"
              color="yellow"
            />
            <div>{{ featuredMovie?.vote_average?.toFixed(1) }} / 10</div>
          </div>
        </div>
        <!-- transition -->
        <div
          class="h-16"
          :style="`background-image: linear-gradient(to top, rgba(30,30,30,1), rgba(30,30,30,0));`"
        />
      </div>
    </div>

    <!-- popular movies -->
    <div class="bg-[rgba(30,30,30,1)] min-h-[40vh] pb-5">
      <card-render :movies="popularMovies" mode="slider" type="movies" />
    </div>

    <!-- popular series -->
    <div class="bg-[rgba(30,30,30,1)] min-h-[40vh] pb-5">
      <card-render
        :tv-series="tvSeriesInLandingPage"
        mode="slider"
        type="tv-series"
      />
    </div>
  </nuxt-layout>
</template>
