import React, { useState, useEffect } from 'react'
import { getPlaylists } from '../services/spotify'


interface Playlist {
    name: string
}

function FilterPlaylist() {
    const [playlists, setPlaylists] = useState<Playlist[]>([])  // Need to make more specific type

    useEffect(() => {
        getPlaylists()
            .then((result) => {
                console.log("res", result)
                if (!("items" in result)) return

                let items = result.items as Playlist[]
                setPlaylists(items.map((i) => {
                    return {
                        name: i.name
                    }
                }))
            })
    }, [])

    return (
        <>
            <div>
                {playlists.map((p) => <div>{p.name}</div>)}
            </div>
        </>
    )
}

export default FilterPlaylist
