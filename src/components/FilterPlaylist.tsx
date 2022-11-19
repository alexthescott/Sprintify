import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { getPlaylists } from '../services/spotify/api'



interface Playlist {
    id: string,
    name: string
}

function FilterPlaylist() {
    const navigate = useNavigate()
    const fetching = useRef(false)
    const [playlists, setPlaylists] = useState<Playlist[]>([])  // Need to make more specific type

    useEffect(() => {
        if (fetching.current) return
        fetching.current = true
        getPlaylists()
            .then((result) => {
                console.log("res", result)
                if (!("items" in result)) return

                let items = result.items as Playlist[]
                setPlaylists(items.map((i) => {
                    return {
                        id: i.id,
                        name: i.name
                    }
                }))
            })
            .catch(() => {
                navigate("/login")
            })
            .finally(() => {
                fetching.current = false
            })
    }, [])

    return (
        <>
            <div>
                {playlists.map((p) => <div key={p.id}>{p.name}</div>)}
            </div>
        </>
    )
}

export default FilterPlaylist
