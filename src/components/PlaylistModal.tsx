import React from 'react'

import { CloseIcon } from '../assets/icons'
import { Playlist, PlaylistItem } from '../services/spotify/models'


interface Props {
    isOpen: boolean
    playlist: Playlist
    items: PlaylistItem[]
    onYes: () => void
    onNo: () => void
    onClose: () => void
}
function PlaylistModal({ isOpen, playlist, items, onClose, onYes, onNo }: Props) {
    return (isOpen ? (
        <>
        <div className="z-50 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="bg-black border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-solid rounded-t">
                        <h3 className="text-white text-l md:text-2xl">{playlist.name}</h3>
                        <CloseIcon className="fill-white" onClick={onClose} />
                    </div>
                    <div className="relative p-6 flex-auto">
                        <p className="text-sm md:text-xl">Would you like to sort this playlist by bpm?</p>
                    </div>
                    <div className="flex items-center justify-end p-6 rounded-b">
                        <button
                            className="text-white bg-stone-900 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                            onClick={onYes}
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