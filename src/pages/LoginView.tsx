import React, { useEffect } from 'react'
import { AUTH_URL } from '../services/spotify/auth'
import { hasToken } from '../utils/cache'

import { useNavigate } from 'react-router-dom'


function LoginView() {
    const navigate = useNavigate()

    useEffect(() => {
        // if (hasToken())
        //     navigate("/app")
    }, [navigate])

    return (
        <span className="flex justify-center items-center h-screen bg-black">
            <div>
                {/* Login icon and AppInfo link? */}

                <div className="relative container grid place-items-center">
                    <h1 className="fixed top-10 text-2xl text-white p-0">Filter Your Spotify Playlists by BPM</h1>
                    <a href={AUTH_URL}>
                        <div className="account_btn items-center">Sign in with Spotify</div>
                    </a>
                    {/* App info 'What is this button?' */}
                </div>
            </div>
        </span>
    )
}

export default LoginView