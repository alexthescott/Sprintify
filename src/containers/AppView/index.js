import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import {
    startAppView,
    getAppViewData,
} from '../../concepts/app-view';
import AppNavigation from '../../components/AppNavigation';

class AppView extends React.Component {
    componentDidMount() {
        this.props.startAppView();
    }

    render() {
        return(
            <div className="pt-0">
                <div className="relative min-h-full pb-12">
                    <AppNavigation/>
                    {/* AppNavigation and Popups?*/}
                    <div className="App-content flex justify-center items-center h-screen bg-black text-white">
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