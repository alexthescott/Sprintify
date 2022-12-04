import { getToken } from '../../utils/cache'
import { Playlist, PlaylistItem, Track, TrackFeatures } from './models'

const BASE_URL = 'https://api.spotify.com/v1'


interface CallApiArgs {
    endpoint: string  // if starts with / prepends BASE_URL
    method?: "GET" | "POST" | "PUT" | "DELETE"
    params?: any  // URL Params
    body?: any  // Body Content
    resolvePages?: boolean  // Resolve pages
}
async function callApi({ endpoint, method="GET", params={}, body={}, resolvePages=false }: CallApiArgs): Promise<any | any[]> {
    const token = getToken()

    // Build URL
    let urlString = endpoint
    if (urlString.startsWith("/")) {
        urlString = BASE_URL + urlString
    }
    const url = new URL(urlString)
    Object.entries(params).forEach(([k, v]) => {
        url.searchParams.append(k, v as string)
    })
    
    // Build Non-url request components
    const headers = {
        Authorization: `Bearer ${token}`
    }

    const options: RequestInit = {
        method,
        headers
    }
    if (method !== "GET") options.body = JSON.stringify(body)

    const response = await fetch(
        url,
        options,
    )

    if (!response.ok) {
        throw new Error("Unsuccessful api response")
    }

    const content = await response.json()
    if (!resolvePages) return content

    const total = content.total
    const limit = content.limit

    if (limit <= 0) throw new Error("Limit must be greater than 0")

    let pageContent = [content]
    
    const apiPromises = []
    for (let offset = limit; offset < total; offset += limit) {
        apiPromises.push(
            callApi({
                endpoint,
                params: {
                    ...params, 
                    offset: offset
                }
            })
        )
    }

    pageContent = pageContent.concat(await Promise.all(apiPromises))
    
    return pageContent
}


// Convenience API Methods
async function getCurrentUser(): Promise<any> {
    return await callApi({
        endpoint: "/me",
        method: "GET"
    })
}

async function getPlaylists(): Promise<Playlist[]> {
    const response = await callApi({
        endpoint: "/me/playlists",
        resolvePages: true
    })
    if (Array.isArray(response)) 
        return response.flatMap((res) => res.items)

    return response.items
}

async function getPlaylistItems(playlistId: string): Promise<PlaylistItem[]> {
    const response = await callApi({
        endpoint: `/playlists/${playlistId}/tracks`,
        resolvePages: true
    })
    if (Array.isArray(response)) 
        return response.flatMap((res) => res.items)

    return response.items
}

async function getTrackFeatures(tracks: string[]): Promise<TrackFeatures[]> {
    const apiPromises: Promise<any[]>[] = []
    for (let i = 0; i < tracks.length; i += 100) {  // Api only supports 100 tracks at a time
        apiPromises.push(
            callApi({
                endpoint: "/audio-features",
                params: {
                    ids: tracks.slice(i, i + 100).join(",")
                },
                resolvePages: true
            })
        )
    }
    const responses = await Promise.all(apiPromises)
    return responses.flatMap((res: any) => res[0].audio_features)
}

interface CreatePlaylistArgs {
    userId: string // The user's spotify id
    name: string
    description?: string
}
async function createPlaylist({ userId, name, description=""}: CreatePlaylistArgs): Promise<Playlist> {
    return await callApi({
        endpoint: `/users/${userId}/playlists`,
        method: "POST",
        body: {
            name,
            public: true,
            collaborative: false,
            description
        }
    })
}

async function addTracks(playlistId: string, trackUris: string[]): Promise<string> {
    const responses: any[] = []
    for (let i = 0; i < trackUris.length; i += 100) {  // Api only supports 100 tracks at a time
        // Need to push tracks serially to guarantee proper order
        responses.push(
            await callApi({
                endpoint: `/playlists/${playlistId}/tracks`,
                method: "POST",
                body: {
                    uris: trackUris.slice(i, i + 100)
                },
            })
        )
    }

    return responses[0].snapshot_id
}

// Higher level convenience methods
interface CreatePoplatedPlaylistArgs {
    userId: string // The user's spotify id
    name: string
    description?: string
    tracks: Track[]
}
async function createPopulatedPlaylist({ userId, name, description="", tracks }: CreatePoplatedPlaylistArgs): Promise<void> {
    const playlist = await createPlaylist({ userId, name, description })

    addTracks(playlist.id, tracks.map(track => track.uri))
}

async function populateTrackFeatures(tracks: Track[]): Promise<Track[]> {
    const features = await getTrackFeatures(tracks.map(track => track.id))

    if (features.length !== tracks.length) throw new Error("Feature count does not match track count")

    return tracks.map((track, i) => {
        track.features = features[i]
        return track
    })
}


export { 
    callApi, 
    getCurrentUser, 
    getPlaylists, 
    getPlaylistItems, 
    getTrackFeatures, 
    populateTrackFeatures,
    createPopulatedPlaylist
}