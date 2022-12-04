import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { getPlaylists } from '../services/spotify/api'
import { AUTH_URL } from '../services/spotify/auth'
import { Playlist, User } from '../services/spotify/models'
import { cleanCacheForReauth, cacheRedirect, getCurrentUser } from '../utils/cache'
import PlaylistCard from './PlaylistCard'
import PlaylistModal from './PlaylistModal'

function FilterPlaylist() {
    const navigate = useNavigate()
    const fetching = useRef(false)
    const [playlists, setPlaylists] = useState<Playlist[]>([])  // Need to make more specific type
    const [currentUser, setCurrentUser] = useState<User | undefined>()
    const [modalOpen, setModalOpen] = useState(false)

    // Modal
    const [playlist, setPlaylist] = useState<Playlist | undefined>()
    

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
        try {
            setCurrentUser(getCurrentUser())
        } catch {
            cleanCacheForReauth()
            cacheRedirect('/filter-playlist')
            window.location.href = AUTH_URL
        }

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

    const openPlaylist = (playlist: Playlist) => {
        setPlaylist(playlist)
        setModalOpen(true)
    }

    return (<>
        <div className="md:ml-20 md:mr-[68px] mx-3 mb-4">
            {currentUser !== undefined && <div className="my-4 mx-1 text-2xl font-bold">{currentUser.display_name}'s Playlists</div>}
            <div className="grid gap-5 lg:grid-cols-4 grid-cols-3 grid-rows-3">
                {playlists.filter(shouldRenderPlaylist).map(p =>
                    <PlaylistCard playlist={p} onClick={() => openPlaylist(p)} />
                )}
            </div>
        </div>
        {playlist !== undefined && <PlaylistModal 
            open={modalOpen} 
            playlist={playlist}
            onClose={() => setModalOpen(false)}
            onNo={() => {setModalOpen(false)}} />
        }
    </>)
}

export default FilterPlaylist
