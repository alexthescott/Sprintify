import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { authorizeUser } from '../../concepts/auth';

export default function LoginView() {
    // change theme?
        return (
            <span>
                <div className="login">
                    {{/* Login icon and AppInfo link? */}}
                </div>
                <div className="login_content">
                    <h1 className="login_title">Filter Your Spotify Playlists by BPM</h1>
                    <button onClick={this.props.authorizeUser}>
                        Sign in with Spotify
                    </button>

                    {{/* App info 'What is this button?' */}}
                </div>
            </span>  
        );
}