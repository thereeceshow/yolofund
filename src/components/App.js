import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';

import './App.css';
import Signup from './Signup'
import Nav from './Nav'
import About from './About'
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
            <Route path='/About'>
              <About />
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
