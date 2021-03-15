import { Component } from 'react'

// TODO Constants file
const FILL_PRE = '@'
const FILL_POST = '0'

export default class Search extends Component {
  constructor(props) {
    super(props)

    this.state = { query: '' }
  }

  _buildCode = (school, number) => {
    // TODO account for longer numbers as well
    return FILL_PRE.repeat(4 - school.length) + school + number + FILL_POST.repeat(3)
  }

  // TODO Actually parsing should be on the back end...
  _parse = (query) => {
    let code = ''
    const codeArr = query.replace(/\s/g, '').split(/(\d+)/)
    if (codeArr.length === 1) { // Only has school, so list all
      code = codeArr[0]
    } else {
      code = this._buildCode(...codeArr)
    }
    return code
  }

  handleChange = (event) => {
    this.setState({ query: event.target.value })
  }

  handleSubmit = (event) => {
    // TODO Explore using PropTypes to enforce
    const query = this._parse(this.state.query)
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
