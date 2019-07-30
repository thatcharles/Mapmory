import React, { useState, useEffect } from 'react'
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps'
import * as parkData from './data/skateboard-parks.json'
import MapStyles from './MapStyles'
const { InfoBox } = require('react-google-maps/lib/components/addons/InfoBox')

function Map () {
  const [selectedPark, setSelectedPark] = useState(null)

  useEffect(() => {
    const listener = e => {
      if (e.key === 'Escape') {
        setSelectedPark(null)
      }
    }
    window.addEventListener('keydown', listener)

    return () => {
      window.removeEventListener('keydown', listener)
    }
  }, [])

  function handleClick (event) {
  	const lat = event.latLng.lat(); const lng = event.latLng.lng()
  	console.log(event.placeId)
  }

  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 45.4211, lng: -75.6903 }}
      onClick={(e) => handleClick(e)}
    >
      {parkData.features.map(park => (
        <Marker
          key={park.properties.PARK_ID}
          position={{
            lat: park.geometry.coordinates[1],
            lng: park.geometry.coordinates[0]
          }}
          onClick={() => {
            setSelectedPark(park)
          }}
        />
      ))}

      {selectedPark && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedPark(null)
          }}
          position={{
            lat: selectedPark.geometry.coordinates[1],
            lng: selectedPark.geometry.coordinates[0]
          }}
        >
          <div>
            <h2>{selectedPark.properties.NAME}</h2>
            <p>{selectedPark.properties.DESCRIPTIO}</p>
            <p><input type='text' placeholder='input your name' name='myFullName' /></p>
            <p><button>Submit</button></p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  )
}

const MapWrapped = withScriptjs(withGoogleMap(Map))

export default MapWrapped
