import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'

class ReactMarkdownComponent extends Component {
  render () {
    const { input } = this.props
    const disallowed = ['image']
    return (
      <ReactMarkdown className='markdown' source={input} disallowedTypes={disallowed} />
    )
  }
}

export default ReactMarkdownComponent
