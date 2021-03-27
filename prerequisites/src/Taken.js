import { Component } from 'react'
import { search } from './Course/actions.js'
import TakenCourse from './TakenCourse.js'

import './Taken.css'

export default class Search extends Component {
  // TODO merge same, TODO Test backend handle multiple same, TODO delete, TODO clear
  // TODO Backend if taken is null must apply restrictions also
  // TODO Backend should also remove courses that have been taken
  constructor(props) {
    super(props)
    // TODO Taken should probably be an object by uid
    this.state = { query: '', taken: [] }
  }

  addCourse = async (query) => {
    try {
      const data = await search(query);
      const results = data.results;
      if (data.count === 0 || this.state.taken.some(course => course.uid === results[0].uid)) {
        // TODO throw a 404 error
        this.setState({ query: '' })
        return
      }
      const course = { did: results[0].did, uid: results[0].uid }
      this.setState({ query: '', taken: [...this.state.taken, course] })
    } catch (err) {
      // TODO Use axios.interceptors
      if (err.response.status === 404) {
        // TODO show a not found popup
      } else {
        alert(err)
      }
    }
  }

  removeCourse = (uid) => {
    this.setState({ taken: this.state.taken.filter(course => course.uid !== uid) })
  }

  handleChange = (event) => {
    this.setState({ query: event.target.value })
  }

  handleAdd = (event) => {
    this.addCourse(this.state.query)
  }

  handleSearch = (event) => {
    // TODO Use params instead
    const uids = this.state.taken.map(course => course.uid)
    this.props.search(uids)
  }

  handleKeyUp = (event) => {
    switch (event.key) {
      case 'Enter':
        this.handleAdd(event)
        break
      default:
        break
    }
  }

  render() {
    const taken = []
    for (const course of this.state.taken) {
      taken.push(
        <TakenCourse key={course.uid} course={course} delete={this.removeCourse}>
          {course.did}
        </TakenCourse>
      )
    }

    return (
    <div onKeyUp={this.handleKeyUp}>
      <input type='text' value={this.state.query} onChange={this.handleChange}></input>
      <button onClick={this.handleAdd}>Add</button>
      <span> course number of taken courses, then </span>
      <button onClick={this.handleSearch}>List</button>
      <span> courses you can take.</span>
      <div className='container'>{taken}</div>
    </div>
  )}
}

