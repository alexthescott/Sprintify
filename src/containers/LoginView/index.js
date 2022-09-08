import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { authorizeUser } from '../../concepts/auth';

class LoginView extends React.Component {
    // change theme?
    render() {
        return (
            <span className="flex justify-center items-center h-screen bg-black">
                <div>
                    {/* Login icon and AppInfo link? */}

                    <div className="relative container grid place-items-center">
                        <h1 className="text-white p-0">Filter Your Spotify Playlists by BPM</h1>
                        <button className="account_btn items-center" onClick={this.props.authorizeUser}>
                            Sign in with Spotify
                        </button>
                        {/* App info 'What is this button?' */}
                    </div>
                </div>
            </span>  
        );
    }
}

const mapStateToProps = () => ({});
const mapDispatch = { authorizeUser }; 

export default connect(
    mapStateToProps,
    mapDispatch
)(LoginView);