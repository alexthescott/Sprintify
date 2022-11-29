import React from "react";
import { getPlaylistItems } from "../services/spotify/api";
import { Playlist, PlaylistItem } from "../services/spotify/models";

interface Props {
    playlist: Playlist
    onClick?: () => void
}
function PlaylistCard({ playlist, onClick }: Props) {
    return (
        <div key={playlist.id} className="flex justify-center hover:cursor-pointer select-none max-w-sm" onClick={onClick} >
            <div className="rounded-lg shadow-lg bg-neutral-900 hover:bg-neutral-700 transition-colors w-full">
                <div className="rounded-lg aspect-square m-4">
                    <img className="rounded-lg aspect-square object-cover shadow-2xl" src={playlist.images[0].url} alt={playlist.name} loading="lazy"/>
                </div>
                <div key={playlist.id} className="font-bold mx-3 -mt-1 text-ellipsis overflow-hidden whitespace-nowrap flex-1">{playlist.name}</div>
                {playlist.tracks.total === 1 ? 
                    <div className="text-sm mx-3 mb-2 flex-1">{playlist.tracks.total} track</div>
                : 
                    <div className="text-sm mx-3 mb-2 flex-1">{playlist.tracks.total} tracks</div>
                }
            </div>
        </div>
    )
}

export default PlaylistCard