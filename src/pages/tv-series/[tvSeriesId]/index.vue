<script setup lang="ts">
import type { TvSeries, TvSeriesEpisode } from 'stores/tv-series.store'
import type { Cast } from 'stores/movies.store'
import { getMovieBackdrop, getMoviePoster } from 'utils/backdrop-poster'
import noImage from '@/assets/icons-and-logos/no-image.png'

const route = useRoute()
const tvSeriesStore = useTvSeriesStore()
const { listTvSeriesLoading, currentTvSeries, fetchEpisodesLoading } =
  storeToRefs(tvSeriesStore)
const {
  getTvSeriesById,
  getTvSeriesCast,
  getSimilarTvSeries,
  getTvSeriesEpisodes,
} = useTvSeriesStore()

const tvSeriesId = route.params.tvSeriesId as unknown as number

const thisTvSeriesCasts = ref<Cast[]>([])
const thisTvSeriesSimilars = ref<TvSeries[]>([])
const selectedEpisodes = ref<TvSeriesEpisode[]>([])
const selectedSeason = ref<number>(
  currentTvSeries?.value?.seasons?.[0]?.season_number || 0
)

const fetchEpisodes = async () => {
  const responseEpisodes = await getTvSeriesEpisodes(
    tvSeriesId,
    selectedSeason.value
  )

  if (responseEpisodes) {
    selectedEpisodes.value = responseEpisodes
  }
}

const onChangeSeason = (seasonId: number) => {
  selectedEpisodes.value = []
  selectedSeason.value = seasonId
  fetchEpisodes()
}

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
  await fetchEpisodes()
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
          class="flex flex-col md:flex-row gap-16 w-full lg:min-h-[30vh] md:min-h-[20vh] min-h-[20vh] px-6 md:px-16 lg:px-20 md:pt-32 pt-28"
        >
          <!-- featured banner -->
          <div
            class="flex flex-col gap-2 align-middle text-white w-full md:w-1/2"
          >
            <div
              class="text-large lg:text-3xl md:text-3xl font-bold drop-shadow-md"
            >
              <div v-if="!listTvSeriesLoading">
                {{ currentTvSeries?.name }}
              </div>
              <u-skeleton v-else class="h-24 opacity-50" />
            </div>

            <div
              v-if="!listTvSeriesLoading"
              class="text-xs lg:text-sm w-3/4 drop-shadow-md"
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
              v-if="!listTvSeriesLoading"
              class="flex flex-row gap-2 flex-wrap items-center text-sm lg:text-base"
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
                  icon="i-heroicons-book-open"
                  button-style="primary"
                  :label="`${currentTvSeries?.number_of_seasons} seasons`"
                />
              </div>

              <div class="flex flex-row gap-2 items-center">
                <base-button
                  icon="i-heroicons-list-bullet"
                  button-style="primary"
                  :label="`${currentTvSeries?.number_of_episodes} episodes`"
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
        </div>

        <!-- seasons and episodes -->
        <div
          class="w-full lg:min-h-[50vh] min-h-[30vh] px-6 md:px-16 lg:px-20 pt-6"
        >
          <!-- web mode -->
          <div
            class="hidden md:flex flex-row text-white bg-[rgba(30,30,30,0.4)]"
          >
            <div class="w-1/3 max-h-[50vh] no-scrollbar overflow-scroll">
              <div v-if="listTvSeriesLoading">
                <u-skeleton class="h-24 w-full opacity-20" />
              </div>
              <div v-else class="flex flex-col gap-2">
                <div
                  v-for="season in currentTvSeries?.seasons"
                  :key="season?.season_number"
                >
                  <div
                    class="flex flex-row gap-6 items-center pl-4 pt-4 pb-4"
                    :class="
                      season?.season_number === selectedSeason
                        ? 'bg-[rgba(30,30,30,0.4)]'
                        : ''
                    "
                  >
                    <div
                      class="w-20 h-32"
                      :style="`background-image: url(${getMoviePoster(season?.poster_path)}); background-size: cover; background-position: center;`"
                    />
                    <div class="flex flex-col gap-2">
                      <div
                        class="hover:underline text-xl font-semibold cursor-pointer"
                        @click="onChangeSeason(season?.season_number)"
                      >
                        {{ `Season ${season?.season_number}` }}
                      </div>
                      <div>{{ `${season?.episode_count} episodes` }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="w-2/3 bg-[rgba(30,30,30,0.4)] p-4 max-h-[50vh] overflow-scroll no-scrollbar"
            >
              <div v-if="fetchEpisodesLoading">
                <u-skeleton class="h-24 w-full opacity-20" />
              </div>
              <div
                class="flex flex-col max-h-[50 vh] overflow-scroll no-scrollbar gap-2"
              >
                <div
                  v-for="episode in selectedEpisodes"
                  :key="episode?.episode_number"
                >
                  <div class="flex gap-3 items-start">
                    <div
                      class="w-64 h-40 flex-none"
                      :style="
                        episode?.still_path
                          ? `background-image: url(${getMoviePoster(episode?.still_path)}); background-size: cover; background-position: center;`
                          : `background-image: url(${noImage})`
                      "
                    />
                    <div class="flex flex-col gap-2 grow">
                      <div class="text-lg font-semibold">
                        {{ `Episode ${episode?.episode_number}` }}
                      </div>
                      <div class="text-base">
                        {{ `${episode?.name}` }}
                      </div>
                      <div class="text-sm">{{ `${episode?.overview}` }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
          :casts="thisTvSeriesCasts"
          :loading="listTvSeriesLoading"
          mode="slider"
          type="casts"
        />
      </div>

      <!-- related tv series -->
      <div class="bg-[rgba(30,30,30,1)] min-h-[40vh] pb-5">
        <card-render
          label="Related TV Series"
          :tv-series="thisTvSeriesSimilars"
          :loading="listTvSeriesLoading"
          mode="slider"
          type="tv-series"
        />
      </div>
    </div>
  </nuxt-layout>
</template>
