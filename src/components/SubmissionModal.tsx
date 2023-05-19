import React, { useEffect, useRef, useState } from "react"

import { CloseIcon } from "../assets/icons"
import { ApiCall, createPopulatedPlaylist, getPlaylistItems, populateTrackFeatures } from "../services/spotify/api"
import { AUTH_URL } from "../services/spotify/auth"
import { Playlist, PlaylistItem, Track, TrackFeatures } from "../services/spotify/models"
import { cacheRedirect, cleanCacheForReauth, getCurrentUser, getCurrentBPM } from "../utils/cache"
import { BPM } from "./BpmInput"
import BpmInput from "./BpmInput"
import Modal from "./Modal"
import Spinner from "./Spinner"

type SubmissionState = "bpm" | "submitting" | "complete"

interface Props {
  open: boolean
  playlist: Playlist
  onNo: () => void
  onClose: () => void
}

function SubmissionModal({ open, playlist, onClose, onNo }: Props) {
  const [submissionState, setSubmissionState] = useState<SubmissionState>("bpm")
  const [createdPlaylist, setCreatedPlaylist] = useState<Playlist>()
  const [tracks, setTracks] = useState<Track[]>([])
  const [bpm, setBpm] = useState<BPM>({ max: 260, min: 60 })

  // For cancelling api calls that are no longer needed
  const playlistItemCalls = useRef<ApiCall<PlaylistItem[]>[]>([])
  const populateTrackFeaturesCalls = useRef<ApiCall<TrackFeatures[]>[]>([])

  const isValidInput = () => {
    const bpm = getCurrentBPM()
    return bpm["max"] > bpm["min"] && bpm["max"] <= 260 && bpm["min"] >= 60
  }

  const submitPlaylist = () => {
    setSubmissionState("submitting")
    const playlistTracks = tracks
      .filter((track) => {
        if (track.features === undefined) throw new Error("Track features must be populated")
        return bpm.min <= track.features.tempo && bpm.max >= track.features.tempo
      })
      .sort((a, b) => {
        if (a.features === undefined || b.features === undefined) throw new Error("Track features must be populated")
        return a.features.tempo - b.features.tempo
      })
    createPopulatedPlaylist({
      userId: getCurrentUser().id,
      name: `Sprintified ${playlist.name}`,
      description: `Placeholder description - ${bpm.min}-${bpm.max} BPM`,
      tracks: playlistTracks,
    }).then((playlist) => {
      setCreatedPlaylist(playlist)
      setSubmissionState("complete")
    })
  }

  const cleanupApiCalls = () => {
    while (playlistItemCalls.current.length > 1) {
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
        return res.map((item) => item.track)
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
        cacheRedirect("/filter-playlist") // Should add routing to specific playlist modals for handling reauth better
        window.location.href = AUTH_URL
      })
  }, [open, playlist])

  let content
  if (submissionState == "bpm") {
    content = (
      <>
        <div className="flex items-start justify-between p-5 border-solid rounded-t">
          <h3 className="text-white text-l md:text-2xl">{playlist.name}</h3>
          <CloseIcon className="fill-white -mr-4" viewBox="0 0 70 70" onClick={onClose} />
        </div>
        <div className="relative p-6 flex-auto -mt-6">
          <BpmInput onChange={(bpm: BPM) => setBpm(bpm)} />
        </div>
        <div className="flex items-center justify-end p-6 rounded-b -mt-6">
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
      </>
    )
  } else if (submissionState == "submitting") {
    content = (
      <>
        <div className="flex items-start justify-between p-5 border-solid rounded-t">
          <h3 className="text-white text-l md:text-2xl">{playlist.name}</h3>
        </div>
        <div className="relative p-6 flex-auto">
          <p>
            Sprintifying "{playlist.name}" for {bpm.min} BPM to {bpm.max} BPM
          </p>
        </div>
        <div className="self-center pb-4">
          <Spinner className="w-10 h-10" />
        </div>
      </>
    )
  } else if (submissionState == "complete") {
    content = (
      <>
        <div className="flex items-start justify-between p-5 border-solid rounded-t">
          <h3 className="text-white text-l md:text-2xl">{playlist.name}</h3>
        </div>
        <div className="relative p-6 flex-auto">
          <p>
            Successfully Sprintified "{playlist.name}" for {bpm.min} BPM to {bpm.max} BPM. Your playlist is available{" "}
            <a
              className="text-green-600 hover:shadow-lg"
              target="_blank"
              href={createdPlaylist?.external_urls?.spotify}
            >
              here
            </a>
            .
          </p>
        </div>
        <button
          className="text-white self-center pb-4 bg-stone-900 disabled:bg-stone-900 active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
          type="button"
          onClick={onNo}
        >
          Done
        </button>
      </>
    )
  }

  return (
    <Modal isOpen={open}>
      <div className="bg-black border-0 rounded-lg shadow-lg pb-3 relative flex flex-col w-full outline-none focus:outline-none max-w-lg">
        {content}
      </div>
    </Modal>
  )
}

export default SubmissionModal
