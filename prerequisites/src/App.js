import { Component } from 'react'

import { buildMeta } from './utils.js'
import Search from './Search.js'
import Taken from './Taken.js'
import Course from './Course/Course.js'
import { search as httpSearch, select as httpSelect } from './Course/actions.js'

import './App.css'

const TYPE_LIST = 0
const TYPE_DETAIL = 1

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: TYPE_LIST,
      courses: [],
      meta: {},
      course: {} 
    }
  }

  search = async (query) => {
    try {
      const data = await httpSearch(query)
      if ('count' in data) {
        // TODO should do merging
        this.setState({ 
          type: TYPE_LIST, 
          courses: data.results, 
          meta: buildMeta(data)
        })
      } else {
        this.setState({ type: TYPE_DETAIL, course: data })
      }
    } catch (err) {
      // TODO Use axios.interceptors
      if (err.response.status === 404) {
      } else {
        alert(err)
      }
    }
  }

  select = async (taken) => {
    try {
      const data = await httpSelect(taken)
      this.setState({
        type: TYPE_LIST,
        courses: data.results,
        meta: buildMeta(data)
      })
    } catch (err) {
      // TODO Use axios.interceptors
      if (err.response.status === 404) {
      } else {
        alert(err)
      }
    }
  }

  render() {
    let content
    switch (this.state.type) {
      case TYPE_LIST:
        content = []
        for (const course of this.state.courses) {
          content.push(<Course key={course.uid} course={course}/>)
        }
        break
      case TYPE_DETAIL:
        content = (<Course course={this.state.course}/>)
        break
      default:
        break
    }
    return (
      <div className="App">
        <Search search={this.search}/>
        <Taken search={this.select}/>
        {content}
      </div>
    )
  }
}

