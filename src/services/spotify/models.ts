interface User {
    id: string
    display_name: string
}

interface AlbumImage {
    url: string
    width: number
    height: number
}

interface Album {
    id: string
    name: string
    images: AlbumImage[]
    total_tracks: number
}

interface Track {
    id: string
    name: string
    album: Album
}

interface Playlist {
    id: string
    public: boolean
    collaborative: boolean
    name: string
    images: any[]
    description: string
    tracks: {
        href: string
        total: number
    }
    owner: {
        id: string
    }
}

interface PlaylistItem {
    added_at: string // UTC ISO-8601 string
    track: Track
}

export type { User, Playlist, Track, PlaylistItem }
