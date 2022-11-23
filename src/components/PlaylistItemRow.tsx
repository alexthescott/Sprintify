import React from 'react'
import { PlaylistItem } from '../services/spotify/models'

interface Props {
    item: PlaylistItem
}
function PlaylistItemRow({ item }: Props) {
    console.log(item)
    return (
        <div className="flex">
            <img className="flex-initial w-12 h-12" src={item.track.album.images[2].url}/>
            <p className="text-white">{item.track.name}</p>
        </div>
    )
}

export default PlaylistItemRow