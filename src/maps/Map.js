import React, { Component } from 'react'

// for GM
// import MapWrapped from './GoogleMaps'

// for GM3
import Map from './GM3'

// for GM3
const data = [
  {
    name: 'Sydney',
    title: 'Sydney',
    lat: -33.847927,
    lng: 150.6517938,
    id: 1
  },
  {
    name: 'Melbourne',
    title: 'Melbourne',
    lat: -37.9722342,
    lng: 144.7729561,
    id: 2
  },
  {
    name: 'Perth',
    title: 'Perth',
    lat: -31.9546904,
    lng: 115.8350292,
    id: 3
  }
]

// for GM3
const style = {
  height: '500px'
}

class MapHere extends Component {
  render () {
    return (
      <div>
        <div style={style}>
          <Map places={data} center={{ lat: -24.9923319, lng: 135.2252427 }} />
        </div>
      </div>
    )
  }
}

export default MapHere

// for GM
// <div style={{ width: '100vw', height: '100vh' }}>
//           <MapWrapped
//             googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
//               process.env.REACT_APP_GOOGLE_KEY
//             }`}
//             loadingElement={<div style={{ height: `100%` }} />}
//             containerElement={<div style={{ height: `100%` }} />}
//             mapElement={<div style={{ height: `100%` }} />}
//           />
// </div>
