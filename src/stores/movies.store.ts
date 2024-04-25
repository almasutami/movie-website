import { defineStore } from 'pinia'
import { fetchAPI } from 'utils/fetch-url'

interface Genre {
  id: string
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
interface Movie {
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

interface State {
  moviesInLandingPage: Movie[]
  listMovieLoading: boolean
}

export const activeStatusKey = 'active-status'

export const useMovieStore = defineStore('movie-store', {
  state: (): State => ({
    moviesInLandingPage: [],
    listMovieLoading: false,
  }),
  actions: {
    async listPopularMoviesForLandingPage() {
      this.listMovieLoading = true
      const response = await fetchAPI(
        'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1'
      )
      this.listMovieLoading = false

      this.moviesInLandingPage = response?.results

      return response
    },
  },
})
