<script setup lang="ts">
import { storeToRefs } from 'pinia'
import CardRender from 'components/card-render.vue'
import { useInfiniteScroll } from '@vueuse/core'

const tvSeriesStore = useTvSeriesStore()
const { tvSeriesInDiscoverPage, tvSeriesGenres } = storeToRefs(tvSeriesStore)
const { discoverTvSeries, fetchAllTvSeriesGenres } = useTvSeriesStore()

const el = ref<HTMLElement | null>(null)
const selectedGenreId = ref<number>()
const currentPage = ref<number>(1)
const isScrolled = ref<Boolean>(false)

const handleScroll = () => {
  const scrollPosition = window.scrollY
  isScrolled.value = scrollPosition > 0
  if (isScrolled.value === false) {
    stopInfiniteScroll()
  } else {
    startInfiniteScroll()
  }
}

const fetchTvSeries = async () => {
  let url = `https://api.themoviedb.org/3/discover/tv?page=${currentPage.value}&sort_by=popularity.desc`

  if (selectedGenreId.value) {
    url += `&with_genres=${selectedGenreId.value}`
  }

  await discoverTvSeries(url, currentPage.value)
}
const startInfiniteScroll = () => {
  if (isScrolled.value === false) return
  useInfiniteScroll(
    el,
    async () => {
      currentPage.value++
      await fetchTvSeries()
    },
    { distance: 10, interval: 1000 }
  )
}

const stopInfiniteScroll = () => {
  if (isScrolled.value === false) return
  useInfiniteScroll(
    el,
    async () => {
      currentPage.value++
      await fetchTvSeries()
    },
    { distance: 10, interval: 1000, canLoadMore: () => false }
  )
}

onMounted(async () => {
  window.addEventListener('scroll', handleScroll)
  fetchAllTvSeriesGenres()
  tvSeriesInDiscoverPage.value = []
  await fetchTvSeries()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  stopInfiniteScroll()
})

watch(
  selectedGenreId,
  async (oldValue, newValue) => {
    if (oldValue === newValue) return
    tvSeriesInDiscoverPage.value = []
    currentPage.value = 1
    await fetchTvSeries()
  },
  { deep: true }
)
</script>

<template>
  <nuxt-layout name="default-page-layout">
    <div
      class="bg-[rgba(30,30,30,1)] h-full min-h-screen pb-5 md:pt-24 pt-18 text-white"
      ref="el"
    >
      <!-- all genres -->
      <div class="lg:px-16 md:px-8 px-4 text-white py-2">
        <div>
          <div class="flex flex-row gap-2 items-center mb-3">
            <div class="lg:text-2xl md:text-lg text-base">
              Discover Tv series by genre
            </div>
            <div class="align-middle">
              <u-tooltip
                text="Scroll right to find more genre"
                :popper="{ placement: 'top' }"
                class="align-middle"
              >
                <u-icon
                  size="lg"
                  name="i-heroicons-information-circle"
                  color="teal"
                />
              </u-tooltip>
            </div>
          </div>
        </div>
        <div class="flex space-x-6 text-gray-300 overflow-scroll no-scrollbar">
          <base-button
            v-for="tvSeriesGenre in tvSeriesGenres"
            :key="tvSeriesGenre.id"
            class="hover:cursor-pointer"
            @click="selectedGenreId = tvSeriesGenre.id"
            :button-style="
              selectedGenreId === tvSeriesGenre.id ? 'primary' : 'secondary'
            "
            :label="tvSeriesGenre.name"
          />
        </div>
      </div>
      <!-- list all tv series -->
      <card-render
        mode="full-page"
        :tvSeries="tvSeriesInDiscoverPage"
        type="tv-series"
      />
    </div>
  </nuxt-layout>
</template>
