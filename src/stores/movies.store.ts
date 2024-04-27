import { defineStore } from 'pinia'
import { fetchAPI } from 'utils/fetch-url'

export interface Genre {
  id: number
  name: string
}
export interface ProductionCountry {
  iso_3166_1: string
  name: string
}
export interface ProductionCompany {
  id: number
  logo_path: string
  name: string
  origin_country: string
}
export interface SpokenLanguage {
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

export interface Cast {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: string
  profile_path: string
  cast_id: number
  character: string
  credit_id: string
  order: number
}

export interface MovieVideo {
  iso_639_1: string
  iso_3166_1: string
  name: string
  key: string
  site: string
  size: number
  type: string
  official: boolean
  published_at: string
  id: string
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
  movieGenres: Genre[]
  moviesAndTvSeriesInSearch: {
    id: number
    poster_path: string
    vote_average: number
  }[]
  searchQuery: string
}

export const useMovieStore = defineStore('movie-store', {
  state: (): State => ({
    moviesInLandingPage: [],
    listMovieLoading: false,
    currentMovie: undefined,
    listMovieGenreLoading: false,
    moviesInDiscoverPage: [],
    movieGenres: [],
    moviesAndTvSeriesInSearch: [],
    searchQuery: '',
  }),
  actions: {
    async fetchAllMovieGenres() {
      this.listMovieGenreLoading = true
      const response = await fetchAPI(
        'https://api.themoviedb.org/3/genre/movie/list'
      )
      this.listMovieGenreLoading = false

      this.movieGenres = response?.genres

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
    async discoverMovies(url: string, page: number = 1) {
      this.listMovieLoading = true
      const fetchUrl =
        url ||
        `https://api.themoviedb.org/3/discover/movie?page=${page}&sort_by=popularity.desc`
      const response = await fetchAPI(fetchUrl)

      this.listMovieLoading = false
      const newArray = this.moviesInDiscoverPage.concat(response?.results)
      this.moviesInDiscoverPage = newArray

      return response
    },
    async getMovieById(movieId: number) {
      this.listMovieLoading = true
      const response = await fetchAPI(
        `https://api.themoviedb.org/3/movie/${movieId}`
      )
      this.listMovieLoading = false

      this.currentMovie = response

      return response
    },
    async getMovieVideos(movieId: number) {
      this.listMovieLoading = true
      const response = await fetchAPI(
        `https://api.themoviedb.org/3/movie/${movieId}/videos`
      )
      this.listMovieLoading = false

      return response
    },
    async getMovieCast(movieId: number) {
      this.listMovieLoading = true
      const response = await fetchAPI(
        `https://api.themoviedb.org/3/movie/${movieId}/credits`
      )
      this.listMovieLoading = false

      return response?.cast
    },
    async getSimilarMovies(movieId: number) {
      this.listMovieLoading = true
      const response = await fetchAPI(
        `https://api.themoviedb.org/3/movie/${movieId}//similar?page=1`
      )
      this.listMovieLoading = false

      return response?.results
    },
    async fetchMoviesAndTvSeries(query: string) {
      this.listMovieLoading = true
      const fetchUrlMovies = `https://api.themoviedb.org/3/search/movie?query=${query}&page=1`
      const responseMovies = await fetchAPI(fetchUrlMovies)

      const fetchUrlTvSeries = `https://api.themoviedb.org/3/search/tv?query=${query}&page=1`
      const responseTvSeries = await fetchAPI(fetchUrlTvSeries)

      this.listMovieLoading = false
      const newArrayMovies = this.moviesInDiscoverPage.concat(
        responseMovies?.results
      )
      const newArrayTvSeries = this.moviesInDiscoverPage.concat(
        responseTvSeries?.results
      )

      const combinedArray = [] as {
        id: number
        poster_path: string
        vote_average: number
      }[]
      newArrayMovies.forEach((movie) => {
        combinedArray.push({
          id: movie.id,
          poster_path: movie.poster_path,
          vote_average: movie.vote_average,
        })
      })
      newArrayTvSeries.forEach((movie) => {
        combinedArray.push({
          id: movie.id,
          poster_path: movie.poster_path,
          vote_average: movie.vote_average,
        })
      })
      this.moviesAndTvSeriesInSearch = combinedArray

      console.log(this.moviesAndTvSeriesInSearch)
    },
  },
  getters: {
    getMovieGenreName: (state) => (id: number) => {
      return state?.movieGenres?.find((genre) => genre?.id === id)?.name
    },
  },
})
