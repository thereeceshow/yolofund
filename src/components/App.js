import React, { useState, useEffect } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import history from "../utilities/history";
import { Router } from 'react-router';

import './App.css';
import Signup from './Signup'
import Nav from './Nav'
import Dash from './Dash'
import About from './About'
import Stock from './Stock'
import Footer from './Footer'
import Home from './Home'
import { AuthProvider } from '../utilities/AuthContext'

// import bootstrap from 'bootstrap'

function App() {


  return (
    <div className="App">
      <AuthProvider>
        <Router history={history}>
          <Nav />
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
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
            <Route path='/login'>
              <Signup
                login
              />
            </Route>
          </Switch>
        </Router>
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
