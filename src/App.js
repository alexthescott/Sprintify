// Sprintify
// https://dev.to/dom_the_dev/how-to-use-the-spotify-api-in-your-react-js-app-50pn

import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, Routes } from 'react-router-dom';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';

import * as reducers from './reducers';
import { axiosApiMiddleware } from './services/axios';
import history from './services/history';

import AppView from './containers/AppView';
import LoginView from './containers/LoginView';
import Callback from './containers/Callback';

const store = configureStore({reducer: reducers})

function hello() {
  return (
    <div>
      <h1>Hello</h1>
    </div>
  )
}

const App = () => {
  return (
    <Provider store={store}>
      <Router location={history.location} navigator={history}>
        <Routes>
          <Route path="/login" element={<hello/>}/>
          {{/* <Route exact path="/app-info" component={AppInfo}/> */}}
          {{/* <Route path="/callback" Component={Callback}/>  */ }}
          <Route path="/" element={<hello/>}/>
        </Routes>
      </Router>
    </Provider>
  );
}



export default App;