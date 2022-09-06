// Sprintify
// https://dev.to/dom_the_dev/how-to-use-the-spotify-api-in-your-react-js-app-50pn

import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Route, Routes, BrowserRouter, Router } from 'react-router-dom';
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

const App = () => {
  return (
    <Router location={history.location} navigator={history}>
      <Routes>
        <Route path="/" element={<AppView/>}></Route>
      </Routes>
    </Router>
  );
}



export default App;