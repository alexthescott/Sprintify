import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import {
    startAppView,
    getAppViewData,
} from '../../concepts/app-view';

class AppView extends React.Component {
    componentDidMount() {
        this.props.startAppView();
    }

    render() {
        return(
            <div className="App flex justify-center items-center h-screen bg-black">
                <div className="App-container">
                    {/* AppNavigation and Popups?*/}
                    <div className="App-content text-white">
                        <h1>AppView Content</h1>
                    </div>
                </div>
            </div>
            );
    }
}

const mapStateToProps = getAppViewData;
const mapDispatch = { startAppView };

export default connect(
    mapStateToProps,
    mapDispatch
)(AppView);