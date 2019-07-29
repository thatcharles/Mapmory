import React, { Component } from 'react'
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps'
import MapStyles from './MapStyles'

class MapContainer extends Component () {

	constructor(props){
	    super(props)
	    this.state={
	    	location: null
	    }
	}

	setLocation = (location) => {
	  	this.setState({
	  		loctaion: location
	 	})
	}

	render () {
		const {location} = this.state 
	  return (

	    <GoogleMap defaultZoom={14} defaultCenter={{ lat: 24.813829, lng: 120.967484 }}>
	      <Marker
	        position={{
	          lat: 24.813829,
	          lng: 120.967484
	        }}
	        onClick={() => {
	          this.setLocation('new location')
	        }}
	      />

	      {location && (
	        	<InfoWindow
	          onCloseClick={() => { this.setLocation(null) }}
	          position={{
			            lat: 24.813829,
			            lng: 120.967484
			        }}
			    >
	          <div>
	            <h2>Your Selected Location</h2>
	            <p><input type='text' placeholder='MyInputBlockComponent input name' name='myInput' /></p>
	          </div>
	        	</InfoWindow>

	      )}
	    </GoogleMap>
	  )
	}
}

export default MapContainer
