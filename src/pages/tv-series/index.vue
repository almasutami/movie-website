<script setup lang="ts">
import { storeToRefs } from 'pinia'
import CardRender from 'components/card-render.vue'
import { useInfiniteScroll } from '@vueuse/core'

const tvSeriesStore = useTvSeriesStore()
const { tvSeriesInDiscoverPage } = storeToRefs(tvSeriesStore)
const { discoverTvSeries } = useTvSeriesStore()

const el = ref<HTMLElement | null>(null)
const currentPage = ref(1)

const startInfiniteScroll = () => {
  useInfiniteScroll(
    el,
    async () => {
      currentPage.value++
      await discoverTvSeries('', currentPage.value)
    },
    { distance: 10, interval: 1000 }
  )
}

const stopInfiniteScroll = () => {
  useInfiniteScroll(
    el,
    async () => {
      currentPage.value++
      await discoverTvSeries('', currentPage.value)
    },
    { distance: 10, interval: 1000, canLoadMore: () => false }
  )
}

onMounted(async () => {
  tvSeriesInDiscoverPage.value = []
  await discoverTvSeries('', currentPage.value)
  startInfiniteScroll()
})

onUnmounted(() => {
  stopInfiniteScroll()
})
</script>

<template>
  <nuxt-layout name="default-page-layout">
    <!-- list all tvSeries -->
    <div
      class="bg-[rgba(30,30,30,1)] h-full min-h-screen pb-5 md:pt-28 pt-24 text-white"
      ref="el"
    >
      <card-render
        mode="full-page"
        :tvSeries="tvSeriesInDiscoverPage"
        type="tv-series"
      />
    </div>
  </nuxt-layout>
</template>
