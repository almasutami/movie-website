<script setup lang="ts">
import type { TvSeries } from 'stores/tv-series.store'
import type { Cast } from 'stores/movies.store'
import { getMovieBackdrop } from 'utils/backdrop-poster'

const route = useRoute()
const tvSeriesStore = useTvSeriesStore()
const { listTvSeriesLoading, currentTvSeries } = storeToRefs(tvSeriesStore)
const { getTvSeriesById, getTvSeriesCast, getSimilarTvSeries } =
  useTvSeriesStore()

const tvSeriesId = route.params.tvSeriesId as unknown as number

const thisTvSeriesCasts = ref<Cast[]>([])
const thisTvSeriesSimilars = ref<TvSeries[]>([])

onMounted(async () => {
  await getTvSeriesById(tvSeriesId)
  const responseCast = await getTvSeriesCast(tvSeriesId)
  if (responseCast) {
    thisTvSeriesCasts.value = responseCast
  }
  const responseSimilar = await getSimilarTvSeries(tvSeriesId)
  if (responseCast) {
    thisTvSeriesSimilars.value = responseSimilar
  }
})
</script>

<template>
  <nuxt-layout name="default-page-layout">
    <div
      class="h-full bg-no-repeat bg-cover bg-fixed bg-top"
      :style="
        !listTvSeriesLoading
          ? `background-image: linear-gradient(to bottom, rgba(30,30,30,1), rgba(30,30,30,0), rgba(30,30,30,1)), url(${getMovieBackdrop(currentTvSeries?.backdrop_path as string)});`
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
          <div class="flex flex-col gap-2 align-middle text-white w-1/2">
            <div
              class="text-large lg:text-3xl md:text-3xl font-bold drop-shadow-md"
            >
              <div v-if="!listTvSeriesLoading">
                {{ currentTvSeries?.name }}
              </div>
              <u-skeleton v-else class="h-24 opacity-50" />
            </div>

            <div
              class="text-xs lg:text-sm w-3/4 drop-shadow-md"
              v-if="!listTvSeriesLoading"
            >
              <div v-if="!listTvSeriesLoading">
                {{ currentTvSeries?.overview }}
              </div>
            </div>

            <!-- genres -->
            <div
              v-if="!listTvSeriesLoading && !listTvSeriesLoading"
              class="flex flex-row gap-2 items-center text-sm lg:text-base"
            >
              <div v-for="genre in currentTvSeries?.genres" :key="genre.id">
                <u-badge color="black" variant="solid">{{
                  genre?.name
                }}</u-badge>
              </div>
            </div>

            <!-- rating , runtime, language -->
            <div
              class="flex flex-row gap-2 items-center text-sm lg:text-base"
              v-if="!listTvSeriesLoading"
            >
              <div class="flex flex-row gap-2 items-center">
                <u-button
                  icon="i-heroicons-star-solid"
                  variant="solid"
                  color="yellow"
                  :label="`${currentTvSeries?.vote_average?.toFixed(1)} / 10`"
                />
              </div>

              <div class="flex flex-row gap-2 items-center">
                <base-button
                  icon="i-heroicons-clock"
                  button-style="primary"
                  :label="`${currentTvSeries?.number_of_episodes} episodes`"
                />
              </div>

              <div class="flex flex-row gap-2 items-center">
                <base-button
                  icon="i-heroicons-clock"
                  button-style="primary"
                  :label="`${currentTvSeries?.number_of_seasons} seasons`"
                />
              </div>
              <div class="flex flex-row gap-2 items-center">
                <base-button
                  button-style="primary"
                  :label="`${currentTvSeries?.original_language?.toUpperCase()}`"
                />
              </div>
            </div>
          </div>
          <!-- seasons and episodes -->
          <div class="w-1/2 h-full">Seasons and episodes here</div>
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
          :casts="thisTvSeriesCasts"
          :loading="listTvSeriesLoading"
          mode="slider"
          type="casts"
        />
      </div>

      <!-- related tv series -->
      <div class="bg-[rgba(30,30,30,1)] min-h-[40vh] pb-5">
        <card-render
          label="Related TvSeries"
          :tv-series="thisTvSeriesSimilars"
          :loading="listTvSeriesLoading"
          mode="slider"
          type="tv-series"
        />
      </div>
    </div>
  </nuxt-layout>
</template>
