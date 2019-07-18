import React, { Component } from 'react'

class Timer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      count: 0
    }
  }
  render () {
    const { count } = this.state
    return (
      <h1>Corrent Count: {count}</h1>
    )
  }

  componentDidMount () {
    const { startCount } = this.props
    this.setState({
      count: startCount
    })

    
    this.doIntervalChange()
    // re-render() new state
  }

  doIntervalChange = () => {
    this.myInterval = setInterval(() => {
      this.setState(prevState => ({
        count: prevState.count + 1
      }))    
    }, 1000)
  }

  componentWillUnmount () {
    clearInterval(this.myInterval)
  }
}

export default Timer
