import React, { Component } from 'react'
import PostData from '../data/posts.json'

import PostDetail from './PostDetail'
import PostSorting from './PostSorting'

class postlist extends Component {
  constructor (props) {
    super(props)
    this.handleDataCallback = this.handleDataCallback.bind(this) // needed if we call methods within render
    this.handleRemoveItem = this.handleRemoveItem.bind(this)
    this.state = {
      postList: []
    }
  }

  componentDidMount () {
    this.setState({
      postList: PostData
    })
  }

  updateBackend (currentPostList) {
    console.log('Updating...')
    this.setState({
      postList: currentPostList
    })
  }

  handleRemoveItem (removeItem) {
    let currentPostList = this.state.postList
    currentPostList.pop(removeItem)

    this.updateBackend(currentPostList)
  }

  handleDataCallback (postItem) {
    // alert(textMsg)
    console.log(postItem)
    let currentPostList = this.state.postList
    currentPostList.push(postItem)
    this.setState({
      postList: currentPostList
    })
  }

  render () {
    const { postList } = this.state
    return (
      <div>
        <h1>hello</h1>
        <PostSorting />
      </div>
    )
  }
}

export default postlist
