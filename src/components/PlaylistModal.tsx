import React from 'react'

import Modal from 'react-modal'
import { CloseIcon } from '../assets/icons'
import { Playlist, PlaylistItem } from '../services/spotify/models'
import PlaylistItemRow from './PlaylistItemRow'


Modal.setAppElement("#root")

interface Props {
    isOpen: boolean
    playlist: Playlist
    items: PlaylistItem[]
    onYes: () => void
    onNo: () => void
    onClose: () => void
}
function PlaylistModal({ isOpen, playlist, items, onClose, onYes, onNo }: Props) {
    return <Modal
        isOpen={isOpen}
        style={{content:{margin: 0, background: "black", padding: 0, overflow: "visible"}}}
        onRequestClose={onClose}
    >
        <div>
            <div className="flex bg-stone-900 p-5">
                <h1 className="flex-1 text-white text-lg">{playlist.name}</h1>
                <CloseIcon className="fill-white" onClick={onClose}/>
            </div>
            {/* <div className="px-5">  // Idk if we should render playlist
                {items.map((item) => <PlaylistItemRow item={item} />)}
            </div> */}
            <p className="text-white">Do you want to sort this?</p>
            <div className="flex">
                <button className="bg-stone-900 text-white text-lg rounded-sm flex-initial w-32 p-3 m-1" onClick={onYes}>Yes</button>
                <button className="bg-stone-900 text-white text-lg rounded-sm flex-initial w-32 p-3 m-1" onClick={onNo}>No</button>
            </div>
        </div>
    </Modal>
}

export default PlaylistModal