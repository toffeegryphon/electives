import { Component } from 'react'
import { parse } from './utils.js'

export default class Taken extends Component {
  constructor(props) {
    super(props)

    this.state = { query: '' }
  }

  handleChange = (event) => {
    this.setState({ query: event.target.value })
  }

  handleSubmit = (event) => {
    // TODO Explore using PropTypes to enforce
    const query = parse(this.state.query)
    this.props.search(query)
  }

  handleKeyUp = (event) => {
    switch (event.key) {
      case 'Enter':
        this.handleSubmit(event)
        break
      default:
        break
    }
  }

  render() {
    return (
    <div onKeyUp={this.handleKeyUp}>
      <input type='text' value={this.state.query} onChange={this.handleChange}></input>
      <button onClick={this.handleSubmit}>Search</button>
    </div>
  )}
}
