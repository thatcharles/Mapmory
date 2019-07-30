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

import Map from './maps/Map'

class App extends Component {
  render () {
    const inputText = '<h1>This Is My Markdown</h1> \n\n # Try React.js'
    const loggedIn = true
    const supportHistory = 'pushState' in window.history
    const startCount = 5
    return (
      <div className='App'>
        <ImageDropAndCrop />
        <Map />
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
// GM3:
//        <div style={style}>
//          <Map places={data} center={{ lat: -24.9923319, lng: 135.2252427 }} />
//        </div>
// <WrappedMap googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDFg4AwzplAEmpbG6_UT8RVb93JdcrIsEI'} loadingElement={<div style={{ height: '100%' }} />} containerElement={<div style={{ height: `800px` }} />} mapElement={<div style={{ height: `100%` }} />} />
