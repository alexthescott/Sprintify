import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { getPlaylists } from '../services/spotify/api'
import { AUTH_URL, clearToken } from '../services/spotify/auth'
import { Playlist } from '../services/spotify/models'
import { cacheRedirect } from '../services/redirect'



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
                cacheRedirect('/filter-playlist')
                window.location.href = AUTH_URL
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
