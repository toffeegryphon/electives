import { get } from 'axios'

const BASE = 'https://toffeegryphon.pythonanywhere.com/courses/'
const QUERY_SEARCH = 'search'

// TODO I think it should not return a promise,
// should add Component as an arg and update it
export const getCourse = (id) => {
  return get(BASE + id)
}

export const searchCourse = (query) => {
  const params = { [QUERY_SEARCH]: query }
  return get(BASE, { params })
}

export const search = async (query) => {
  const response = await searchCourse(query);
  const data = response.data;
  return data;
}
