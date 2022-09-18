import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import { ReactComponent as SetBpmIcon } from '../../resources/icons/set_bpm.svg'
import { ReactComponent as FilterPlaylistIcon } from '../../resources/icons/filter_playlist.svg'
import { ReactComponent as GeneratePlaylist } from '../../resources/icons/generate_playlist.svg'


export default () => (
    <div className="text-white bg-stone-900 fixed px-2 bottom-0 right-0 left-0 flex align-center text-center justify-evenly md:left-0 md:top-0 md:right-auto md:w-100 md:pt-40 md:pr-auto md:h-full md:justify-flex md:flex-d md:flex-col">
        <Link className="app-icon" to="/app">
        </Link>
        <NavLink activeClassName="active" className="" to="/set-bpm">
            <SetBpmIcon className="fill-white block mx-auto"/>
            <span className="text-sm">Set Bpm</span>
        </NavLink>
        <NavLink activeClassName="active" className="text-center" to="/filter-playlist">
            <FilterPlaylistIcon className="fill-white block mx-auto" />
            <span className="text-sm">Filter Playlist</span>
        </NavLink>
        <NavLink activeClassName="active" className="text-center" to="/generate-playlist">
            <GeneratePlaylist className="fill-white block mx-auto" />
            <span className="text-sm">Generate Playlist</span>
        </NavLink>
    </div>
);