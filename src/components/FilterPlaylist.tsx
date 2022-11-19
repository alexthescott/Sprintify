import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { getPlaylists } from '../services/spotify/api'
import { clearToken } from '../services/spotify/auth'
import { Playlist } from '../services/spotify/models'



function FilterPlaylist() {
    const navigate = useNavigate()
    const fetching = useRef(false)
    const [playlists, setPlaylists] = useState<Playlist[]>([])  // Need to make more specific type

    useEffect(() => {
        if (fetching.current) return
        fetching.current = true
        getPlaylists()
            .then((result) => {
                setPlaylists(result)
            })
            .catch(() => {
                clearToken()
                navigate("/login")
            })
            .finally(() => {
                fetching.current = false
            })
    }, [navigate])

    return (
        <>
            <div>
                {playlists.map((p) => <div key={p.id}>{p.name}</div>)}
            </div>
        </>
    )
}

export default FilterPlaylist
