import { Component } from 'react'

export default class Search extends Component {
  constructor(props) {
    super(props)

    this.state = { query: '' }
  }

  handleChange = (event) => {
    this.setState({ query: event.target.value })
  }

  handleSubmit = (event) => {
    // TODO Explore using PropTypes to enforce
    this.props.search(this.state.query)
  }

  render() {
    return (
    <div>
      <input type='text' value={this.state.query} onChange={this.handleChange}></input>
      <button onClick={this.handleSubmit}>Search</button>
    </div>
  )}
}
