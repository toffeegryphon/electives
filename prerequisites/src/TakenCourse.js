import { Component } from 'react'

export default class TakenCourse extends Component {
  handleDelete = (event) => {
    this.props.delete(this.props.course.uid)
  }

  render() {
    return (<div>{this.props.course.did}<button onClick={this.handleDelete}>X</button></div>)
  }
}
