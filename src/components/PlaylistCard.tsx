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
                <div className="rounded-lg aspect-square object-cover m-4 drop-shadow-2xl">
                    <img className="rounded-lg aspect-square object-cover" src={playlist.images[0].url} alt={playlist.name}/>
                </div>
                <div key={playlist.id} className="text-lg font-bold mx-3 -mt-1">{playlist.name}</div>
                <div className="mx-3 mb-2">{playlist.tracks.total} tracks</div>
            </div>
        </div>
    )
}

export default PlaylistCard