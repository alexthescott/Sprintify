import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export default () => (
    <div className="text-white fixed px-2 bottom-0 right-0 left-0 flex align-center text-center justify-around md:left-0 md:top-0 md:right-auto md:w-100 md:pt-40 md:pr-auto md:h-full md:justify-flex md:flex-d md:flex-col">
        <Link className="app-icon" to="/app">
        </Link>
        <NavLink activeClassName="active" className="text-center" to="/set-bpm">
            <span className="icon" />
            <span className="navigation__label">Set Bpm</span>
        </NavLink>
        <NavLink activeClassName="active" className="text-center" to="/filter-playlist">
            <span className="icon" />
            <span className="navigation__label">Filter Playlist</span>
        </NavLink>
        <NavLink activeClassName="active" className="text-center" to="/generate-playlist">
            <span className="icon" />
            <span className="navigation__label">Generate Playlist</span>
        </NavLink>
    </div>
);