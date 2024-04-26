import { defineStore } from 'pinia'
import { fetchAPI } from 'utils/fetch-url'

export interface TvSeries {
  adult: boolean
  backdrop_path: string
  genre_ids: string[]
  id: number
  origin_country: string[]
  original_language: string
  name: string
  overview: string
  popularity: number
  poster_path: string
  first_air_date: string
  vote_average: number
  vote_count: number
}

interface State {
  tvSeriesInLandingPage: TvSeries[]
  listTvSeriesLoading: boolean
}

export const activeStatusKey = 'active-status'

export const useTvSeriesStore = defineStore('tvSeries-store', {
  state: (): State => ({
    tvSeriesInLandingPage: [],
    listTvSeriesLoading: false,
  }),
  actions: {
    async listPopularTvSeriesForLandingPage() {
      this.listTvSeriesLoading = true
      const response = await fetchAPI(
        'https://api.themoviedb.org/3/tv/popular?page=1'
      )
      this.listTvSeriesLoading = false

      this.tvSeriesInLandingPage = response?.results

      return response
    },
  },
})
