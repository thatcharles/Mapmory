import React, { Component } from 'react'

function Alertbox (props) {
  return <h1 classname={'alert, alert-' + props.alertType}>{props.children}</h1>
}

function welcomeHereDialog () {
  return <Alertbox alertType='success'><h1>child content</h1></Alertbox>
}

class ParentWrapper extends Component {
  render () {
    return <Alertbox alertType='success'><h1>child content</h1></Alertbox>
  }
}

export { Alertbox, ParentWrapper }
export default welcomeHereDialog
