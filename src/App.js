import React, { Component } from 'react'
import logo from './logo.svg'
import Postlist from './posts/postlist'
import './App.css'

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import DynamicRouteComp from './RoutingComps/DynamicRouteComp'
import StaticRouteComp from './RoutingComps/StaticRouteComp'
import Notfound from './RoutingComps/NotFound'

import ReactYoutube from './thirdParty/ReactYoutube'
import ReactMarkdownComponent from './thirdParty/ReactMarkdownComponent'

import LifeCycle from './learn/LifeCycle'
import Timer from './learn/Timer'
import welcomeHereDialog, { Alertbox, ParentWrapper } from './learn/ParentWrapper'
import FormsAndInputs from './learn/FormsAndInputs'

import ImageDropAndCrop from './learn/ImageDropAndCrop'

import Map from './maps/GM3'

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

const style = {
  height: '500px'
}

class App extends Component {
  render () {
    const inputText = '<h1>This Is My Markdown</h1> \n\n # Try React.js'
    const loggedIn = true
    const supportHistory = 'pushState' in window.history
    const startCount = 5
    return (
      <div className='App'>
        <ImageDropAndCrop />
        <div style={style}>
          <Map places={data} center={{ lat: -24.9923319, lng: 135.2252427 }} />
        </div>
        <BrowserRouter forceRefresh={!supportHistory} margin-top='20px'>
          <Switch>
            <Route exact path='/about' component={StaticRouteComp} />
            <Route path='/posts/:slug' component={DynamicRouteComp} />
            <Route exact path='/user' render={() => (
              loggedIn === true ? (
                <Redirect to='posts/hello_there/' />
              ) : <StaticRouteComp />
            )} />
            <Route component={Notfound} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App

// <FormsAndInputs />
// <WrappedMap googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDFg4AwzplAEmpbG6_UT8RVb93JdcrIsEI'} loadingElement={<div style={{ height: '100%' }} />} containerElement={<div style={{ height: `800px` }} />} mapElement={<div style={{ height: `100%` }} />} />
