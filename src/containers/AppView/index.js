import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import {
    startAppView,
    getAppViewData,
} from '../../concepts/app-view';

export default function AppView() {
    useEffect(() => {
        //this.props.startAppView()
    });

    return(
        <div className="App">
            <div className="App-container">
                {/* AppNavigation and Popups?*/}

                <div className="App-content">
                    <h1>AppView Content</h1>
                </div>

            </div>
        </div>
    )
}