import { Component } from 'react'

import Search from './Search.js'
import Taken from './Taken.js'
import Course from './Course/Course.js'
import { getCourse } from './Course/actions.js'

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

  _buildMeta = (data) => {
    return {
      // Should be called total, count for current size
      count: data.count,
      next: data.next,
      previous: data.previous
    }
  }

  search = async (query) => {
    try {
      const response = await getCourse(query)
      const data = response.data
      if ('count' in data) {
        // TODO should do merging
        this.setState({ 
          type: TYPE_LIST, 
          courses: data.results, 
          meta: this._buildMeta(data)
        })
      } else {
        this.setState({ type: TYPE_DETAIL, course: response.data })
      }
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
          content.push(<Course course={course}/>)
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
        <Taken search={this.search}/>
        {content}
      </div>
    )
  }
}

