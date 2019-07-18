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

class App extends Component {
  render () {
    const inputText = '<h1>This Is My Markdown</h1> \n\n # Try React.js'
    const loggedIn = true
    const supportHistory = 'pushState' in window.history
    const startCount = 5
    return (
      <div className='App'>
        <ImageDropAndCrop />
        <BrowserRouter forceRefresh={!supportHistory}>
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
