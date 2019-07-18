import React, { Component } from 'react'

class PostDetail extends Component {
  constructor (props) {
    super(props)
    // this.titleCilcked = this.titleCilcked.bind(this)
    this.toggleContent = this.toggleContent.bind(this)
    this.removeContent = this.removeContent.bind(this)
    this.state = {
      showContent: true,
      postItem: null
    }
  }

  titleCilcked = (event) => {
    event.preventDefault()
    const { dataCallback } = this.props
    const newPostItem = this.state.postItem // equals to this.props.post
    newPostItem['title'] = 'This is my new title'
    this.setState({
      postItem: newPostItem
    })
    if (dataCallback !== undefined) {
      dataCallback(newPostItem)
    }
  }

  removeContent (event) {
    event.preventDefault()
    const { removePostItem } = this.state.postItem
    const { RemoveItemCallback } = this.props
    if (RemoveItemCallback !== undefined) {
      RemoveItemCallback(removePostItem)
    }
  }

  toggleContent (event) {
    event.preventDefault()
    const { showContent } = this.state
    this.setState({
      showContent: !showContent
    })
  }

  setPostStateOnPorps () {
    const { post } = this.props
    this.setState({
      postItem: post
    })
  }

  componentDidUpdate (prevProps, prevState, snapshop) {
    if (this.props !== prevProps) {
      this.setPostStateOnPorps()
    }
  }

  componentDidMount () { // call by default before render()
    this.setPostStateOnPorps()
  }

  render () {
    const { postItem } = this.state
    const { showContent } = this.state
    return (
      <div>
        {postItem !== null ? <div>
          <h1 onClick={this.titleCilcked}>{postItem.title} {postItem.date}</h1>
          {showContent === true ? <h2>{postItem.content}</h2> : ''}
          <button onClick={this.toggleContent}>Toggle Content Display</button>
          <button onClick={this.removeContent}>Remove Last Item</button>
        </div>
          : ''}
      </div>
    )
  }
}

export default PostDetail
