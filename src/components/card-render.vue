<script setup lang="ts">
import type { Movie } from 'stores/movies.store'
import type { TvSeries } from 'stores/tv-series.store'
import { getMoviePoster } from 'utils/movie-backdrop'
import { sentenceCase } from 'change-case'

const props = defineProps({
  movies: {
    type: Array as PropType<Movie[]>,
    required: false,
  },
  tvSeries: {
    type: Array as PropType<TvSeries[]>,
    required: false,
  },
  type: {
    type: String as PropType<'movies' | 'tv-series'>,
    required: true,
  },
  mode: {
    type: String as PropType<'slider' | 'full-page'>,
    required: true,
  },
})

const data = computed(() => {
  if (props.type === 'movies') {
    return props.movies
  } else {
    return props.tvSeries
  }
})
</script>

<template>
  <div class="lg:px-16 md:px-8 px-4 text-white py-2">
    <div class="flex flex-row justify-between items-baseline">
      <div class="lg:text-2xl md:text-lg text-base">
        {{ sentenceCase(props?.type) }}
      </div>
      <div>
        <base-button
          v-if="props?.mode === 'slider'"
          button-style="link"
          icon="i-heroicons-chevron-right-20-solid"
          :label="'See more'"
          trailing
        />
      </div>
    </div>
    <div
      class="no-scrollbar py-1"
      :class="props?.mode === 'slider' ? 'overflow-scroll' : ''"
    >
      <div
        :class="
          props?.mode === 'slider'
            ? 'flex gap-4 items-center'
            : 'flex gap-4 items-center flex-wrap'
        "
      >
        <div v-for="movie of data" :key="movie.id">
          <div
            class="hover:cursor-pointer w-40 md:w-44 hover:scale-110"
            :class="props?.mode === 'slider' ? 'w-40 md:w-44' : 'w-40 md:w-52'"
          >
            <img :src="getMoviePoster(movie?.poster_path)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
