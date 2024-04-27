<script setup lang="ts">
import { storeToRefs } from 'pinia'
import CardRender from 'components/card-render.vue'
import { useInfiniteScroll } from '@vueuse/core'

const movieStore = useMovieStore()
const { moviesInDiscoverPage } = storeToRefs(movieStore)
const { discoverMovies } = useMovieStore()

const el = ref<HTMLElement | null>(null)
const currentPage = ref(1)

const startInfiniteScroll = () => {
  useInfiniteScroll(
    el,
    async () => {
      console.log('load more')
      currentPage.value++
      await discoverMovies('', currentPage.value)
    },
    { distance: 10, interval: 1000 }
  )
}

const stopInfiniteScroll = () => {
  useInfiniteScroll(
    el,
    async () => {
      console.log('load more')
      currentPage.value++
      await discoverMovies('', currentPage.value)
    },
    { distance: 10, interval: 1000, canLoadMore: () => false }
  )
}

onMounted(async () => {
  moviesInDiscoverPage.value = []
  await discoverMovies('', currentPage.value)
  startInfiniteScroll()
})

onUnmounted(() => {
  stopInfiniteScroll()
})
</script>

<template>
  <nuxt-layout name="default-page-layout">
    <!-- list all movies -->
    <div
      class="bg-[rgba(30,30,30,1)] h-full min-h-screen pb-5 md:pt-28 pt-24 text-white"
      ref="el"
    >
      <card-render
        mode="full-page"
        :movies="moviesInDiscoverPage"
        type="movies"
      />
    </div>
  </nuxt-layout>
</template>
