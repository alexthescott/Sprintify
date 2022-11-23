import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { getPlaylistItems, getPlaylists } from '../services/spotify/api'
import { AUTH_URL } from '../services/spotify/auth'
import { Playlist, PlaylistItem, User } from '../services/spotify/models'
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
    const [playlistItems, setPlaylistItems] = useState<PlaylistItem[]>([])
    

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

    
    const openPlaylist = (playlist: Playlist) => {
        setPlaylist(playlist)
        setPlaylistItems([])

        setModalOpen(true)
        getPlaylistItems(playlist.id)
            .then((res) => {
                setPlaylistItems(res)
            })
            .catch(() => {
                setModalOpen(false)
            })
    }

    return (<>
        <div className="md:ml-20 md:mr-[68px] mx-3">
            <div className="grid gap-5 grid-cols-3 grid-rows-3">
                {playlists.filter(shouldRenderPlaylist).map(p =>
                    <PlaylistCard playlist={p} onClick={() => openPlaylist(p)} />
                )}
            </div>
        </div>
        {playlist !== undefined && <PlaylistModal 
            isOpen={modalOpen} 
            playlist={playlist} 
            items={playlistItems} 
            onYes={() => console.log("yes")}
            onNo={() => console.log("no")}
            onClose={() => setModalOpen(false)} />
        }
    </>)
}

export default FilterPlaylist
