import React from 'react';
import { connect } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';

import {
    startAppView,
    getAppViewData,
} from '../../concepts/app-view';
import AppNavigation from '../../components/AppNavigation';
import SetBpm from '../../components/SetBpm';
import FilterPlaylist from '../../components/FilterPlaylist';
import GeneratePlaylist from '../../components/GeneratePlaylist';
import { getPlaylists } from "../../services/spotify";


class AppView extends React.Component {
    componentDidMount() {
        this.props.startAppView();
        console.log("playlists", getPlaylists())
    }

    render() {
        return(
            <div className="pt-0">
                <div className="relative min-h-full pb-12">
                    {/*Popups?*/}
                    <div className="App-content fixed left-0 bottom-4 md:bottom-0 md:left-[52px] w-full flex justify-center items-center h-screen bg-black text-white left-21">
                        <Routes>
                            <Route path="*" element={<Navigate to="/set-bpm" replace/>} />
                            <Route path="set-bpm" element={<SetBpm/>}></Route>
                            <Route path="filter-playlist" element={<FilterPlaylist/>}></Route>
                            <Route path="generate-playlist" element={<GeneratePlaylist/>}></Route>
                        </Routes>
                    </div>
                    <AppNavigation />

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