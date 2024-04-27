import { defineStore } from 'pinia'
import type {
  Genre,
  ProductionCountry,
  ProductionCompany,
  SpokenLanguage,
} from 'stores/movies.store'
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

export interface TvSeriesCreatedBy {
  id: number
  credit_id: string
  name: string
  original_name: string
  gender: number
  profile_path: string
}

export interface TvSeriesEpisode {
  id: number
  overview: string
  name: string
  vote_average: number
  vote_count: number
  air_date: string
  episode_number: number
  episode_type: string
  production_code: string
  runtime: number
  season_number: number
  show_id: number
  still_path: string
}

export interface TvSeriesSeason {
  air_date: string
  episode_count: number
  id: number
  name: string
  overview: string
  poster_path: string
  season_number: number
  vote_average: number
}

export interface TvSeriesNetwork {
  id: number
  logo_path: string
  name: string
  origin_country: string
}

export interface TvSeriesDetails {
  adult: boolean
  backdrop_path: string
  created_by: TvSeriesCreatedBy[]
  episode_run_time: number[]
  first_air_date: string
  genres: Genre[]
  homepage: string
  id: number
  in_production: boolean
  languages: string[]
  last_air_date: string
  last_episode_to_air: TvSeriesEpisode
  name: string
  next_episode_to_air: TvSeriesEpisode
  networks: TvSeriesNetwork[]
  number_of_episodes: number
  number_of_seasons: number
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  seasons: TvSeriesSeason[]
  spoken_languages: SpokenLanguage[]
  status: string
  tagline: string
  type: string
  vote_average: number
  vote_count: number
}

interface State {
  currentTvSeries?: TvSeriesDetails
  tvSeriesInLandingPage: TvSeries[]
  listTvSeriesLoading: boolean
  listTvSeriesGenreLoading: boolean
  tvSeriesInDiscoverPage: TvSeries[]
  tvSeriesGenres: Genre[]
}

export const useTvSeriesStore = defineStore('tvSeries-store', {
  state: (): State => ({
    currentTvSeries: undefined,
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
    async getTvSeriesById(movieId: number) {
      this.listTvSeriesLoading = true
      const response = await fetchAPI(
        `https://api.themoviedb.org/3/tv/${movieId}`
      )
      this.listTvSeriesLoading = false

      this.currentTvSeries = response

      return response
    },
    async getTvSeriesCast(movieId: number) {
      this.listTvSeriesLoading = true
      const response = await fetchAPI(
        `https://api.themoviedb.org/3/tv/${movieId}/credits`
      )
      this.listTvSeriesLoading = false

      return response?.cast
    },
    async getSimilarTvSeries(movieId: number) {
      this.listTvSeriesLoading = true
      const response = await fetchAPI(
        `https://api.themoviedb.org/3/tv/${movieId}//similar?page=1`
      )
      this.listTvSeriesLoading = false

      return response?.results
    },
  },
  getters: {
    getTvSeriesGenreName: (state) => (id: number) => {
      return state?.tvSeriesGenres?.find((genre) => genre?.id === id)?.name
    },
  },
})
