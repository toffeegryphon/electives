import { Component } from 'react'
import { parse } from './utils.js'

const QUERY_KW = '?taken='

export default class Search extends Component {
  // TODO merge same, TODO Test backend handle multiple same, TODO delete, TODO clear
  // TODO Backend if taken is null must apply restrictions also
  // TODO Backend should also remove courses that have been taken
  constructor(props) {
    super(props)

    this.state = { query: '', taken: [] }
  }

  handleChange = (event) => {
    this.setState({ query: event.target.value })
  }

  handleAdd = (event) => {
    const query = parse(this.state.query)
    this.setState({ query: '', taken: [...this.state.taken, query]})
  }

  handleSearch = (event) => {
    const query = QUERY_KW + this.state.taken.join(',')
    this.props.search(query)
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
      taken.push(<div>{course}</div>)
    }

    return (
    <div onKeyUp={this.handleKeyUp}>
      <input type='text' value={this.state.query} onChange={this.handleChange}></input>
      <button onClick={this.handleAdd}>Add</button>
      <button onClick={this.handleSearch}>Search</button>
      {taken}
    </div>
  )}
}

