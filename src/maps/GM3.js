/* global google */
import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import InfoWindowEx from "./InfoWindow";

import {MyInputBlockComponent} from '../learn/FormsAndInputs'

const style = {
  height: '500px'
}
export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      location: null,
    };
    this.inputTextAreaRef = React.createRef()
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props.place_,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  showDetails = place => {
    console.log(place);

  };

  handleClick = (event) => {
    const lat = event.latLng.lat()
    const lng = event.latLng.lng()
    console.log(lat,lng);
  }

  handleInputChange = (event) => {
    event.preventDefault()
    this.inputTextAreaRef.current.focus()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  componentDidMount () {
    this.setState({
      location: 'Taiwan'
    })
  }

  render() {
    const {location} = this.state
    return (
      <div className="map-container">
        <p>Your content is: {location}</p>
        <Map
          google={this.props.google}
          className={"map"}
          zoom={4}
          initialCenter={this.props.center}
          style={style}
        >
          {this.props.places.map((place, i) => {
            return (
              <Marker
                onClick={this.onMarkerClick}
                key={place.id}
                place_={place}
                position={{ lat: place.lat, lng: place.lng }}
              />
            );
          })}
          <InfoWindowEx
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <h3>{this.state.selectedPlace.name}</h3>
              <MyInputBlockComponent inputRef={this.inputTextAreaRef} onChange={this.handleInputChange} inputContentName='location'/>
              <button name="detailButton"
                type="button"
                onClick={this.showDetails.bind(this, this.state.selectedPlace)}
              >
                Show details
              </button>
            </div>
          </InfoWindowEx>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDFg4AwzplAEmpbG6_UT8RVb93JdcrIsEI"
})(MapContainer);
