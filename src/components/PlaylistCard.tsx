import React from "react";
import { getPlaylistItems } from "../services/spotify/api";
import { Playlist, PlaylistItem } from "../services/spotify/models";




interface Props {
    playlist: Playlist
    onClick?: () => void
}
function PlaylistCard({ playlist, onClick }: Props) {
    return (
        <div key={playlist.id} className="flex justify-center" onClick={onClick} >
            <div className="rounded-lg shadow-lg bg-stone-900 max-w-sm">
                <img className="rounded-t-lg" src={playlist.images[0].url} alt="" />
                <div key={playlist.id}>{playlist.name}</div>
            </div>
        </div>
    )
}

export default PlaylistCard