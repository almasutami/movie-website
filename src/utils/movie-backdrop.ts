const IMG_API_BACKDROP = 'https://image.tmdb.org/t/p/w1280/'
const IMG_API_POSTER = 'https://image.tmdb.org/t/p/w500/'

export const getMovieBackdrop = (backdrop_path: string) => {
  return `${IMG_API_BACKDROP}${backdrop_path}`
}

export const getMoviePoster = (poster_path: string) => {
  return `${IMG_API_POSTER}${poster_path}`
}
