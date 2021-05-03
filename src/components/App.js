import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';

import './App.css';
import Signup from './Signup'
import Nav from './Nav'
import Dash from './Dash'
import About from './About'
import Stock from './Stock'
import { AuthProvider } from '../utilities/AuthContext'

import bootstrap from 'bootstrap'

function App() {

  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Nav
          // token={token}
          // deleteToken={deleteToken}
          />
          <Switch>
            <Route path='/about'>
              <About />
            </Route>
            <Route path='/stock'>
              <Stock />
            </Route>
            <Route path='/dashboard'>
              <Dash />
            </Route>
            <Route path='/register'>
              <Signup
                register
              />
            </Route>
            {/* <Route exact={true} path="#">
          <Signup saveToken={saveToken} />
        </Route>
        <Route exact={true} path="#">
          <Login saveToken={saveToken} />
        </Route>
        <Route exact={true} path="#">
          <Dash saveToken={saveToken} />
        </Route> */}
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
