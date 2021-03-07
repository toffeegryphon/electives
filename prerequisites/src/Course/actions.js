import { get } from 'axios'

const BASE = 'https://toffeegryphon.pythonanywhere.com/courses/'

// TODO I think it should not return a promise,
// should add Component as an arg and update it
export const getCourse = (id) => {
  return get(BASE + id)
}
