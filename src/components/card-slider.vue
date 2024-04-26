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
    <div class="flex flex-row justify-between items-baseline">
      <div class="lg:text-2xl md:text-lg text-base">Popular movies</div>
      <div>
        <base-button
          button-style="link"
          icon="i-heroicons-chevron-right-20-solid"
          :label="'See more'"
          trailing
        />
      </div>
    </div>
    <div class="overflow-scroll no-scrollbar py-4">
      <div class="flex gap-4 items-center">
        <div
          v-for="movie of props.movies"
          :key="movie.id"
          class="w-full h-full"
        >
          <!-- popular, trending -->
          <!-- if popularity > 500 === popular badge -->
          <div
            class="hover:cursor-pointer w-40 md:w-44 hover-scale-125 rounded-md"
          >
            <img
              :src="getMoviePoster(movie?.poster_path)"
              class="rounded-md hover:scale-110"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
