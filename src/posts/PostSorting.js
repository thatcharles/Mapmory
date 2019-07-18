import React, { Component } from 'react'
import PostData from '../data/posts.json'

import PostDetail from './PostDetail'
class Postsorting extends Component {
  constructor (props) {
    super(props)
    this.togglelistReverse = this.togglelistReverse.bind(this) // needed if we call methods within render
    this.toggleSortDate = this.toggleSortDate.bind(this)
    this.state = {
      postList: [],
      isOldestFirst: true
    }
  }

  sortByDate () {
    const { postList } = this.state
    let newPostlist = postList
    if (this.state.isOldestFirst) {
      newPostlist = postList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    } else {
      newPostlist = postList.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    }
    this.setState({
      postList: newPostlist,
      isOldestFirst: !this.state.isOldestFirst
    })
  }

  toggleSortDate (event) {
    this.sortByDate()
  }

  togglelistReverse (event) {
    const { postList } = this.state
    let newPostlist = postList.reverse()
    this.setState({
      postList: newPostlist
    })
  }

  componentDidMount () {
    this.setState({
      postList: PostData,
      isOldestFirst: true
    })
  }

  render () {
    const { postList } = this.state
    return (
      <div>
        <button onClick={this.togglelistReverse}>Reverse List Order</button>
        <button onClick={this.toggleSortDate}>List Order by Date</button>
        {postList.map((item, index) => {
          return <PostDetail
            post={item}
            key={`post-list-key ${index}`}
            dataCallback={this.handleDataCallback}
            RemoveItemCallback={this.handleRemoveItem} />
        })}
      </div>
    )
  }
}

export default Postsorting
