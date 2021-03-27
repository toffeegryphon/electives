import { Component } from 'react'

import './Course.css'

export default class Course extends Component {
  render() {
    return (
      <div>
        <div className='header'>
          <div>{this.props.course.did}</div>
          <div>{this.props.course.name}</div>
          <div>{this.props.course.section_title}</div>
        </div>
        <div className='description'>{this.props.course.description}</div>
      </div>
    )
  }
}

