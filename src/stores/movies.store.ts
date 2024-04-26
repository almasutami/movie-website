import { defineStore } from 'pinia'
import { fetchAPI } from 'utils/fetch-url'

interface Genre {
  id: number
  name: string
}
interface ProductionCountry {
  iso_3166_1: string
  name: string
}
interface ProductionCompany {
  id: number
  logo_path: string
  name: string
  origin_country: string
}
interface SpokenLanguage {
  english_name: string
  iso_639_1: string
  name: string
}
export interface MovieDetails {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: null
  budget: number
  genres: Genre[]
  homepage: string
  id: number
  imdb_id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: SpokenLanguage[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface Movie {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

interface State {
  moviesInLandingPage: Movie[]
  currentMovie?: MovieDetails
  listMovieLoading: boolean
  listMovieGenreLoading: boolean
  moviesInDiscoverPage: Movie[]
  genres: Genre[]
}

export const activeStatusKey = 'active-status'

export const useMovieStore = defineStore('movie-store', {
  state: (): State => ({
    moviesInLandingPage: [],
    listMovieLoading: false,
    currentMovie: undefined,
    listMovieGenreLoading: false,
    moviesInDiscoverPage: [],
    genres: [],
  }),
  actions: {
    async fetchAllMovieGenres() {
      this.listMovieGenreLoading = true
      const response = await fetchAPI(
        'https://api.themoviedb.org/3/genre/movie/list'
      )
      this.listMovieGenreLoading = false

      this.genres = response?.genres

      return response
    },
    async listPopularMoviesForLandingPage() {
      this.listMovieLoading = true
      const response = await fetchAPI(
        'https://api.themoviedb.org/3/movie/popular?page=1'
      )
      this.listMovieLoading = false

      this.moviesInLandingPage = response?.results

      return response
    },
    async discoverMovies(url: string) {
      this.listMovieLoading = true
      const fetchUrl =
        url ||
        'https://api.themoviedb.org/3/discover/movie?page=1&sort_by=popularity.desc'
      const response = await fetchAPI(fetchUrl)
      this.listMovieLoading = false

      this.moviesInDiscoverPage = response?.results

      return response
    },
  },
  getters: {
    getGenreName: (state) => (id: number) => {
      return state?.genres?.find((genre) => genre?.id === id)?.name
    },
  },
})
