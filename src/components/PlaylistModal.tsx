import React from 'react'

import Modal from 'react-modal'
import { Playlist, PlaylistItem } from '../services/spotify/models'
import PlaylistItemRow from './PlaylistItemRow'


Modal.setAppElement("#root")

interface Props {
    isOpen: boolean
    playlist: Playlist
    items: PlaylistItem[]
    onClose: () => void
}
function PlaylistModal({ isOpen, playlist, items, onClose }: Props) {
    return <Modal
        isOpen={isOpen}
        style={{content:{margin: 0, background: "black", padding: 0}}}
    >
        <div>
            <div className="flex bg-stone-900 p-5">
                <h1 className="flex-1 text-white text-lg">{playlist.name}</h1>
                <button className="text-white" onClick={onClose}>close</button>
            </div>
            <div className="px-5">
                {items.map((item) => <PlaylistItemRow item={item} />)}
            </div>
        </div>
    </Modal>
}

export default PlaylistModal