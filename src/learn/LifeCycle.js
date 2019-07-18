import React, { Component } from 'react'

class LifeCycle extends Component {
  constructor (props) {
    // for default value
    super(props)
    this.state = {
      loading: true
    }
  }
  render () {
    const { loading } = this.state
    return (
      <h1>{loading === true ? 'Loading' : 'Hello World'}</h1>
    )
  }

  componentDidMount () {
    // for actions
    // acync calls, api related calls
    this.setState({
      loading: false
    })

    // re-render() new state
  }

  componentWillUnmount () {
    // unsubscribe, log to backend
  }
}

export default LifeCycle
