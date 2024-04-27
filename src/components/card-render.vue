<script setup lang="ts">
import type { Movie, Cast } from 'stores/movies.store'
import type { TvSeries } from 'stores/tv-series.store'
import { getMoviePoster } from 'utils/backdrop-poster'
import { sentenceCase } from 'change-case'

const props = defineProps({
  movies: {
    type: Array as PropType<Movie[]>,
    required: false,
    default: () => [],
  },
  tvSeries: {
    type: Array as PropType<TvSeries[]>,
    required: false,
    default: () => [],
  },
  casts: {
    type: Array as PropType<Cast[]>,
    required: false,
    default: () => [],
  },
  type: {
    type: String as PropType<'movies' | 'tv-series' | 'casts'>,
    required: true,
  },
  mode: {
    type: String as PropType<'slider' | 'full-page'>,
    required: true,
  },
  loading: {
    type: Boolean,
    required: false,
  },
  label: {
    type: String,
    required: false,
  },
  seeMore: {
    type: Boolean,
    required: false,
  },
})

const data = computed(() => {
  if (props.type === 'movies') {
    return props.movies
  } else if (props.type === 'tv-series') {
    return props.tvSeries
  } else if (props.type === 'casts') {
    return props.casts
  }
})

const isMovie = (obj: any): obj is Movie => {
  return obj.hasOwnProperty('title') && obj.hasOwnProperty('overview')
}

const isTvSeries = (obj: any): obj is TvSeries => {
  return obj.hasOwnProperty('title') && obj.hasOwnProperty('overview')
}

const isMovieCast = (obj: any): obj is Cast => {
  return obj.hasOwnProperty('title') && obj.hasOwnProperty('overview')
}
</script>

<template>
  <div class="lg:px-16 md:px-8 px-4 text-white py-2">
    <div
      v-if="props?.mode !== 'full-page'"
      class="flex flex-row justify-between items-baseline"
    >
      <div class="lg:text-2xl md:text-lg text-base">
        {{ props?.label || sentenceCase(props?.type) }}
      </div>
      <div v-if="props?.seeMore">
        <nuxt-link
          :to="
            props?.type === 'movies'
              ? '/movies'
              : props?.type === 'tv-series'
                ? '/tv-series'
                : '/'
          "
        >
          <base-button
            v-if="props?.mode === 'slider'"
            button-style="link"
            icon="i-heroicons-chevron-right-20-solid"
            :label="'See more'"
            trailing
        /></nuxt-link>
      </div>
    </div>
    <div
      class="no-scrollbar py-1"
      :class="props?.mode === 'slider' ? 'overflow-scroll' : ''"
    >
      <div
        v-if="!props?.loading"
        :class="
          props?.mode === 'slider'
            ? 'flex gap-4 items-center'
            : 'flex gap-4 items-center flex-wrap'
        "
      >
        <div v-for="(object, index) in data" :key="index">
          <div class="hover:cursor-pointer group relative">
            <div
              class="hover:opacity-20"
              :class="
                props?.mode === 'slider'
                  ? 'w-40 md:w-44 h-64'
                  : 'w-40 md:w-52 h-64 md:h-72'
              "
              :style="`background-image: url(${isMovie(object) || isTvSeries(object) ? getMoviePoster(object?.poster_path) : getMoviePoster(object?.profile_path)}); background-size: cover; background-position: center;`"
            />
            {{ object }}
            <div
              v-if="props?.type === 'movies' || props?.type === 'tv-series'"
              class="absolute inset-0 hidden group-hover:flex group-hover:flex-col group-hover:gap-4 group-hover:justify-center group-hover:items-center z-10 bg-[rgba(30,30,30,0.5)]"
            >
              <div class="flex flex-row gap-2 items-center my-2">
                <u-button
                  class="!p-0"
                  icon="i-heroicons-star-solid"
                  variant="link"
                  color="yellow"
                />
                <div>
                  {{
                    isMovie(object) || isTvSeries(object)
                      ? object?.vote_average?.toFixed(1)
                      : ''
                  }}
                  / 10
                </div>
              </div>
              <nuxt-link
                :to="
                  props?.type === 'movies'
                    ? `/movies/${object?.id}`
                    : props?.type === 'tv-series'
                      ? `/tv-series/${object?.id}`
                      : '/'
                "
              >
                <base-button
                  icon="i-heroicons-information-circle"
                  button-style="primary"
                  label="See details"
                />
              </nuxt-link>
            </div>
            <div v-if="props?.type === 'casts'">
              {{ isMovieCast(object) ? object?.name : '' }}
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="props?.loading"
        :class="
          props?.mode === 'slider'
            ? 'flex gap-4 items-center'
            : 'flex gap-4 items-center flex-wrap'
        "
      >
        <div v-for="index in 10" :key="index">
          <div
            :class="
              props?.mode === 'slider'
                ? 'w-40 md:w-44 h-64'
                : 'w-40 md:w-52 h-64 md:h-72'
            "
          >
            <u-skeleton class="h-full w-full" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
