<script setup lang="ts">
import type { Movie } from 'stores/movies.store'
import { getMoviePoster } from 'utils/movie-backdrop'

const props = defineProps({
  movies: {
    type: Array as PropType<Movie[]>,
    required: true,
  },
})
</script>

<template>
  <div class="lg:px-16 md:px-8 px-4 text-white">
    <div class="lg:text-2xl md:text-lg text-base">Popular movie</div>
    <div class="overflow-scroll no-scrollbar py-4">
      <div class="flex gap-4">
        <div
          class="w-full h-full"
          v-for="movie of props.movies"
          :key="movie.id"
        >
          <div class="w-40 md:w-44">
            <img :src="getMoviePoster(movie?.poster_path)" class="rounded-md" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
