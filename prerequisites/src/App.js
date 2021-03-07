import { Component } from 'react'

import Search from './Search.js'
import Course from './Course/Course.js'
import { getCourse } from './Course/actions.js'

import './App.css'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = { course: {} }
  }

  search = async (query) => {
    try {
      const response = await getCourse(query)
      this.setState({ course: response.data })
    } catch (err) {
      alert(err)
    }
  }

  render() {
    return (
      <div className="App">
        <Search search={this.search}/>
        <Course course={this.state.course}/>
      </div>
    )
  }
}

