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
  tvSeriesInDiscoverPage: TvSeries[]
}

export const useTvSeriesStore = defineStore('tvSeries-store', {
  state: (): State => ({
    tvSeriesInLandingPage: [],
    listTvSeriesLoading: false,
    tvSeriesInDiscoverPage: [],
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
    async discoverTvSeries(url: string, page: number = 1) {
      this.listTvSeriesLoading = true
      const fetchUrl =
        url ||
        `https://api.themoviedb.org/3/discover/movie?page=${page}&sort_by=popularity.desc`
      const response = await fetchAPI(fetchUrl)

      this.listTvSeriesLoading = false
      const newArray = this.tvSeriesInDiscoverPage.concat(response?.results)
      this.tvSeriesInDiscoverPage = newArray

      return response
    },
  },
})
