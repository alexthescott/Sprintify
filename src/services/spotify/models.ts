interface Playlist {
    id: string
    public: boolean
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

export type { Playlist }
