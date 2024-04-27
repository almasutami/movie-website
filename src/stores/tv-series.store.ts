import { defineStore } from 'pinia'
import { fetchAPI } from 'utils/fetch-url'
interface Genre {
  id: number
  name: string
}
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
  listTvSeriesGenreLoading: boolean
  tvSeriesInDiscoverPage: TvSeries[]
  tvSeriesGenres: Genre[]
}

export const useTvSeriesStore = defineStore('tvSeries-store', {
  state: (): State => ({
    tvSeriesInLandingPage: [],
    listTvSeriesLoading: false,
    listTvSeriesGenreLoading: false,
    tvSeriesInDiscoverPage: [],
    tvSeriesGenres: [],
  }),
  actions: {
    async fetchAllTvSeriesGenres() {
      this.listTvSeriesGenreLoading = true
      const response = await fetchAPI(
        'https://api.themoviedb.org/3/genre/tv/list'
      )
      this.listTvSeriesGenreLoading = false

      this.tvSeriesGenres = response?.genres

      return response
    },
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
        `https://api.themoviedb.org/3/discover/tv?page=${page}&sort_by=popularity.desc`
      const response = await fetchAPI(fetchUrl)

      this.listTvSeriesLoading = false
      const newArray = this.tvSeriesInDiscoverPage.concat(response?.results)
      this.tvSeriesInDiscoverPage = newArray

      return response
    },
  },
  getters: {
    getTvSeriesGenreName: (state) => (id: number) => {
      return state?.tvSeriesGenres?.find((genre) => genre?.id === id)?.name
    },
  },
})
