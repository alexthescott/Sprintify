import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import {
    startAppView,
    getAppViewData,
} from '../../concepts/app-view';
import AppNavigation from '../../components/AppNavigation';
import SetBpm from '../../components/SetBpm';
import FilterPlaylist from '../../components/FilterPlaylist';
import GeneratePlaylist from '../../components/GeneratePlaylist';



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
                        <Routes>
                            <Route path="set-bpm" element={<SetBpm/>}></Route>
                            <Route path="filter-playlist" element={<FilterPlaylist/>}></Route>
                            <Route path="generate-playlist" element={<GeneratePlaylist/>}></Route>
                        </Routes>
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