import { get } from 'axios'

const BASE = 'https://toffeegryphon.pythonanywhere.com/courses/'
const QUERY_SEARCH = 'search'
const QUERY_TAKEN = 'taken'

// TODO I think it should not return a promise,
// should add Component as an arg and update it
export const getCourse = (id) => {
  return get(BASE + id)
}

const searchCourse = (query) => {
  const params = { [QUERY_SEARCH]: query }
  return get(BASE, { params })
}

export const search = async (query) => {
  const response = await searchCourse(query)
  const data = response.data
  return data
}

const selectCourses = (taken) => {
  const params = { [QUERY_TAKEN]: taken.join(',') }
  return get(BASE, { params })
}

export const select = async (taken) => {
  const response = await selectCourses(taken)
  const data = response.data
  return data
}
