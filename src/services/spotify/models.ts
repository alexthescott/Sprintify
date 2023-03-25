interface User {
  id: string
  display_name: string
}

interface Image {
  url: string
  width: number
  height: number
}

interface Album {
  id: string
  name: string
  images: Image[]
  total_tracks: number
}

interface Track {
  id: string
  uri: string
  name: string
  album: Album
  features?: TrackFeatures // Needs to be manually populated from /audio-features
}

interface TrackFeatures {
  id: string
  danceability: number
  energy: number
  key: number
  loudness: number
  mode: number
  speechiness: number
  acousticness: number
  instrumentalness: number
  liveness: number
  valence: number
  tempo: 96.535
  duration_ms: number
  time_signature: number
}

interface Playlist {
  id: string
  public: boolean
  collaborative: boolean
  name: string
  images: Image[]
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

export type { User, Playlist, Track, TrackFeatures, PlaylistItem }
