import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { createPopulatedPlaylist, getPlaylistItems, getPlaylists, populateTrackFeatures } from '../services/spotify/api'
import { AUTH_URL } from '../services/spotify/auth'
import { Playlist, Track, User } from '../services/spotify/models'
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
    const [playlistTracks, setPlaylistTracks] = useState<Track[]>([])
    

    const shouldRenderPlaylist = (playlist: Playlist): boolean => {
        const canEdit = playlist.collaborative || (
            currentUser !== undefined && 
            playlist.owner.id == currentUser.id
        )

        return canEdit &&
            playlist.images.length >= 1 && 
            playlist.tracks.total > 0
    }

    const submitPlaylist = (name: string, description: string, tracks: Track[]) => {
        
        createPopulatedPlaylist({
            userId: getCurrentUser().id,
            name,
            description,
            tracks
        })
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
        setPlaylistTracks([])

        setModalOpen(true)
        getPlaylistItems(playlist.id)
            .then((res) => {
                return res.map(item => item.track)
            })
            .then((tracks) => {
                return populateTrackFeatures(tracks)
            })
            .then((tracks) => {
                setPlaylistTracks(tracks)
            })
            .catch(() => {
                cleanCacheForReauth()
                cacheRedirect('/filter-playlist')
                window.location.href = AUTH_URL
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
            tracks={playlistTracks} 
            onYes={() => submitPlaylist(`Sprintified ${playlist.name}`, "Placeholder description", playlistTracks)}
            onNo={() => console.log("no")}
            onClose={() => setModalOpen(false)} />
        }
    </>)
}

export default FilterPlaylist
