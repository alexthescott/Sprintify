import React from 'react';
import { getAccessToken, getAuthUrl } from '../../services/spotify';


function LoginView() {
    console.log("Access Token", getAccessToken())
    return (
        <span className="flex justify-center items-center h-screen bg-black">
            <div>
                {/* Login icon and AppInfo link? */}

                <div className="relative container grid place-items-center">
                    <h1 className="fixed top-10 text-2xl text-white p-0">Filter Your Spotify Playlists by BPM</h1>
                    <div className="account_btn items-center">
                        <a href={getAuthUrl()}>Sign in with Spotify</a>
                    </div>
                    {/* App info 'What is this button?' */}
                </div>
            </div>
        </span>
    )
}


export default LoginView