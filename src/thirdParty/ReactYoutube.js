import React, { Component } from 'react'
import YouTube from 'react-youtube'

// https://youtu.be/Pkh8UtuejGw
// https://www.youtube.com/watch?v=Pkh8UtuejGw
class ReactYoutube extends Component {
  // callback  method
  videoOnReady (event) {
    // access to player in all event handlers via event.target
    const player = event.target
    player.seekTo(50)
    console.log(player)
  }

  videOnPlay (event) {
  	const player = event.target
  	console.log(player.getCurrentTime())
  }
  render () {
    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    }

    const { videoId } = this.props

    return (
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={this.videoOnReady}
        onPlay={this.videOnPlay}
      />
    )
  }
}

export default ReactYoutube
