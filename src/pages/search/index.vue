<script setup lang="ts">
import { storeToRefs } from 'pinia'
import CardRender from 'components/card-render.vue'

const movieStore = useMovieStore()
const { moviesAndTvSeriesInSearch, searchQuery, listMovieLoading } =
  storeToRefs(movieStore)
const { fetchMoviesAndTvSeries } = useMovieStore()

const fetchMoviesAndTvSeriesInSearch = async () => {
  if (!searchQuery?.value) return
  await fetchMoviesAndTvSeries(searchQuery.value || 'a')
}

onMounted(async () => {
  await fetchMoviesAndTvSeriesInSearch()
})

watch(
  searchQuery,
  async () => {
    await fetchMoviesAndTvSeriesInSearch()
  },
  { deep: true }
)
</script>

<template>
  <nuxt-layout name="default-page-layout">
    <div
      class="bg-[rgba(30,30,30,1)] h-full min-h-screen pb-5 md:pt-24 pt-18 text-white"
    >
      <div class="lg:px-16 md:px-8 px-4 text-white py-2">
        <div>
          <div class="flex flex-col w-full gap-2 items-center mb-3">
            <div class="lg:text-2xl md:text-lg text-base">
              Search your favorite movies or tv series by their title here!
            </div>
            <div>
              <u-input
                size="xl"
                icon="i-heroicons-magnifying-glass-20-solid"
                variant="none"
                class="w-full"
                :model-value="searchQuery"
                placeholder="Enter title..."
                @change="
                  (value: string) => {
                    searchQuery = value
                  }
                "
              ></u-input>
            </div>
          </div>
        </div>
      </div>
      <!-- list all search result -->
      <card-render
        mode="full-page"
        :loading="listMovieLoading"
        :movies="moviesAndTvSeriesInSearch as Movie[]"
        type="movies"
      />
    </div>
  </nuxt-layout>
</template>
