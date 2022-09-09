import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export default () => (
    <div className="text-white fixed bottom-0 right-0 left-0 flex align-center text-center justify-around md:left-0 md:top-0 md:right-auto md:w-100 md:pt-40 md:pr-auto md:h-full md:justify-flex md:flex-d md:flex-col">
        <Link className="app-icon" to="/app">
        </Link>
        <NavLink activeClassName="active" className="text-center" to="/top-artists">
            <span className="icon ion-android-star-outline" />
            <span className="navigation__label">Top Artists</span>
        </NavLink>
        <NavLink activeClassName="active" className="text-center" to="/top-tracks">
            <span className="icon ion-android-favorite-outline" />
            <span className="navigation__label">Top Tracks</span>
        </NavLink>
        <NavLink activeClassName="active" className="text-center" to="/recently-played">
            <span className="icon ion-android-time" />
            <span className="navigation__label">Recent</span>
        </NavLink>
    </div>
);