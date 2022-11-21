import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { getPlaylists } from '../services/spotify/api'
import { AUTH_URL } from '../services/spotify/auth'
import { cleanCacheForReauth, cacheRedirect, getCurrentUser } from '../utils/cache'
import { Playlist, User } from '../services/spotify/models'


function FilterPlaylist() {
    const navigate = useNavigate()
    const fetching = useRef(false)
    const [playlists, setPlaylists] = useState<Playlist[]>([])  // Need to make more specific type
    const [currentUser, setCurrentUser] = useState<User | undefined>()

    const shouldRenderPlaylist = (playlist: Playlist): boolean => {
        const canEdit = playlist.collaborative || (
            currentUser !== undefined && 
            playlist.owner.id == currentUser.id
        )

        return canEdit &&
            playlist.images.length >= 1 && 
            playlist.tracks.total > 0
    }

    useEffect(() => {
        setCurrentUser(getCurrentUser())

        if (fetching.current) return
        fetching.current = true

        getPlaylists()
            .then((result) => {
                setPlaylists(result)
            })
            .catch(() => {
                cleanCacheForReauth()
                cacheRedirect('/filter-playlist')
                window.location.href = AUTH_URL
            })
            .finally(() => {
                fetching.current = false
            })
    }, [navigate])


    return (
        <div className="md:ml-20 md:mr-[68px] mx-3">
            <div className="grid gap-5 grid-cols-3 grid-rows-3 ">
                {playlists.filter(shouldRenderPlaylist).map((p) => {
                    return( 
                        <div key={p.id} className="flex justify-center">
                            <div className="rounded-lg shadow-lg bg-stone-900 max-w-sm">
                                <img className="rounded-t-lg" src={p.images[0].url} alt="" />
                                <div key={p.id}>{p.name}</div>
                            </div>
                        </div>
                    )}
                )}
            </div>
        </div>
    )
}

export default FilterPlaylist
