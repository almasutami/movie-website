const defaultUrl =
  'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1'

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNWJiODRjNWMyMTRlNTgwZjkzMjQwN2JjOGUxNzI5YyIsInN1YiI6IjYxNDM1ZmM3MDA2YjAxMDA0NDdhMWZhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M68DWhc1mcdzAbezFqaJWm6EdJ79X4f7rtgp8tFQx_U',
  },
}

export const fetchAPI = async (url: string) => {
  const fetchUrl = url || defaultUrl
  const response = await fetch(fetchUrl, options)
  const responseJSON = await response.json()
  console.log(responseJSON)

  return responseJSON
}
