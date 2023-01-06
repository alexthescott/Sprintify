import React, { useEffect, useRef, useState } from 'react'

import { CloseIcon } from '../assets/icons'
import { ApiCall, createPopulatedPlaylist, getPlaylistItems, populateTrackFeatures } from '../services/spotify/api'
import { AUTH_URL } from '../services/spotify/auth'
import { Playlist, PlaylistItem, Track, TrackFeatures } from '../services/spotify/models'
import { cacheRedirect, cleanCacheForReauth, getCurrentUser, getCurrentBPM } from '../utils/cache'
import { BPM } from './BpmInput'
import BpmInput from './BpmInput'


interface Props {
    open: boolean
    playlist: Playlist
    onNo: () => void
    onClose: () => void
}
function PlaylistModal({ open, playlist, onClose, onNo }: Props) {
    const [tracks, setTracks] = useState<Track[]>([])
    const [bpm, setBpm] = useState<BPM>({max: 260, min: 60})

    // For cancelling api calls that are no longer needed
    const playlistItemCalls = useRef<ApiCall<PlaylistItem[]>[]>([])
    const populateTrackFeaturesCalls = useRef<ApiCall<TrackFeatures[]>[]>([])

    const isValidInput = () => {
        const bpm = getCurrentBPM()
        return bpm["max"] > bpm["min"] && bpm["max"] <= 260 && bpm["min"] >= 60
    }

    const submitPlaylist = () => {
        const playlistTracks = tracks.filter((track) => {
            if (track.features === undefined) throw new Error("Track features must be populated")
            
            return bpm.min <= track.features.tempo &&  bpm.max >= track.features.tempo
        }).sort((a, b) => {
            if (a.features === undefined || b.features === undefined) throw new Error("Track features must be populated")

            return a.features.tempo - b.features.tempo
        })
        createPopulatedPlaylist({
            userId: getCurrentUser().id,
            name: `Sprintified ${playlist.name}`,
            description: `Placeholder description - ${bpm.min}-${bpm.max} BPM`,
            tracks: playlistTracks
        })
    }

    const cleanupApiCalls = () => {
        while(playlistItemCalls.current.length > 1) {
            playlistItemCalls.current.shift()?.cancel()
        }
        while (populateTrackFeaturesCalls.current.length > 1) {
            populateTrackFeaturesCalls.current.shift()?.cancel()
        }
    }

    useEffect(() => {
        if (!open) cleanupApiCalls()
        if (playlist === undefined) return

        setTracks([])

        const playlistItemsCall = getPlaylistItems(playlist.id)
        playlistItemCalls.current.push(playlistItemsCall)
    
        playlistItemsCall.result
            .then((res) => {
                if (playlistItemsCall.canceled) return
                return res.map(item => item.track)
            })
            .then((tracks) => {
                if (tracks === undefined) return
                return populateTrackFeatures(tracks)
            })
            .then((tracks) => {
                if (tracks === undefined || tracks[0].features === undefined) return
                setTracks(tracks)
            })
            .catch(() => {
                cleanCacheForReauth()
                cacheRedirect('/filter-playlist')  // Should add routing to specific playlist modals for handling reauth better
                window.location.href = AUTH_URL
            })
    }, [open, playlist])

    return (open ? (
        <>
            <div className="animate-slide-in-from-below flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="bg-black border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-solid rounded-t">
                        <h3 className="text-white text-l md:text-2xl">{playlist.name}</h3>
                        <CloseIcon className="fill-white" onClick={onClose} />
                    </div>
                    <div className="relative p-6 flex-auto">
                        <p className="text-sm md:text-xl">Would you like to sort this playlist by bpm?</p>
                        <BpmInput onChange={(bpm: BPM) => setBpm(bpm)} />
                    </div>
                    <div className="flex items-center justify-end p-6 rounded-b">
                        <button
                                className="text-white bg-stone-900 disabled:bg-stone-900 active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                            onClick={submitPlaylist}
                            disabled={!isValidInput()}
                        >
                            Yes
                        </button>
                        <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                            onClick={onNo}
                        >
                            No
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>
    ) : null
    )
}

export default PlaylistModal