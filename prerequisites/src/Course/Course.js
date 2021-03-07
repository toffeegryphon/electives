import { Component } from 'react'

export default class Course extends Component {
  render() {
    return (
      <div>
        <p>{this.props.course.name}</p>
        <p>{this.props.course.description}</p>
      </div>
    )
  }
}

