import { getToken } from '../../utils/cache'
import { Playlist, PlaylistItem, Track, TrackFeatures, User } from './models'

const BASE_URL = 'https://api.spotify.com/v1'


function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

interface ApiCallArgs {
    endpoint: string  // if starts with / prepends BASE_URL
    method?: "GET" | "POST" | "PUT" | "DELETE"
    params?: any  // URL Params
    body?: any  // Body Content
    resolvePages?: boolean  // Resolve pages
}
class ApiCall<T> {
    canceled: boolean
    result: Promise<T>
    constructor(args: ApiCallArgs, callback?: (values: any | any[]) => T ) {
        this.canceled = false
        this.result = this.run(args, callback)
    }

    async run(args: ApiCallArgs, callback?: (values: any | any[]) => T): Promise<T> {
        const result = await this.callApi(args)
        if (this.canceled) return {} as T
        if (callback !== undefined) {
            return callback(result) as T
        }

        return result as T
    }

    async callApi({ endpoint, method="GET", params={}, body={}, resolvePages=false }: ApiCallArgs): Promise<any | any[]> {
        if (this.canceled) return null

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
    
        let response = await fetch(
            url,
            options,
        )
        
        while (response.status === 429) {  // HTTP 429 is Rate Limit
            if (this.canceled) return null
            await sleep(Number(response.headers.get("retry-after")) * 1000)
            response = await fetch(
                url,
                options,
            )
        }
    
        if (!response.ok) throw new Error("Unsuccessful api response")
    
        const content = await response.json()
        if (!resolvePages) return content
    
        const total = content.total
        const limit = content.limit
    
        if (limit <= 0) throw new Error("Limit must be greater than 0")
    
        let pageContent = [content]
        
        const apiPromises = []
        for (let offset = limit; offset < total; offset += limit) {
            apiPromises.push(
                this.callApi({
                    endpoint,
                    params: {
                        ...params, 
                    ...params, 
                        ...params, 
                    ...params, 
                        ...params, 
                        offset: offset
                    }
                })
            )
        }
    
        pageContent = pageContent.concat(await Promise.all(apiPromises))
        
        return pageContent
    }

    cancel() {
        this.canceled = true
    }
}


// Convenience API Methods
function getCurrentUser(): ApiCall<User> {
    return new ApiCall<User>({
        endpoint: "/me",
        method: "GET"
    })
}

function getPlaylists(): ApiCall<Playlist[]> {
    return new ApiCall<Playlist[]>(
        {
            endpoint: "/me/playlists",
            resolvePages: true
        },
        (response: any | any[]) => {
            if (Array.isArray(response)) 
                return response.flatMap((res: any) => res.items as Playlist[])
        
            return response.items as Playlist[]
        }
    )
}

function getPlaylistItems(playlistId: string): ApiCall<PlaylistItem[]> {
    return new ApiCall<PlaylistItem[]>({
            endpoint: `/playlists/${playlistId}/tracks`,
            resolvePages: true
        },
        (values: {items: any[]}[]) => values.flatMap(value => value.items)
    )
}

function getTrackFeatures(tracks: string[]): ApiCall<TrackFeatures[]>[] {
    const apiCallArgs: ApiCallArgs[] = []
    for (let i = 0; i < tracks.length; i += 100) {  // Api only supports 100 tracks at a time
        apiCallArgs.push({
            endpoint: "/audio-features",
            params: {
                ids: tracks.slice(i, i + 100).join(",")
            },
            resolvePages: true
        })
    }
    return apiCallArgs.map(
        (args) => new ApiCall<TrackFeatures[]>(
            args, 
            (values: any[]) => values[0].audio_features
        )
    )
}

interface CreatePlaylistArgs {
    userId: string // The user's spotify id
    name: string
    description?: string
}
function createPlaylist({ userId, name, description=""}: CreatePlaylistArgs): ApiCall<Playlist> {
    return new ApiCall<Playlist>({
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

function addTracks(playlistId: string, trackUris: string[]): ApiCall<string>[] {
    const apiCallArgs: ApiCallArgs[] = []
    for (let i = 0; i < trackUris.length; i += 100) {  // Api only supports 100 tracks at a time
        // Need to push tracks serially to guarantee proper order
        apiCallArgs.push({
            endpoint: `/playlists/${playlistId}/tracks`,
            method: "POST",
            body: {
                uris: trackUris.slice(i, i + 100)
            },
        })
    }
    return apiCallArgs.map(args => new ApiCall<string>(args))
}

// Higher level convenience methods
interface CreatePoplatedPlaylistArgs {
    userId: string // The user's spotify id
    name: string
    description?: string
    tracks: Track[]
}
async function createPopulatedPlaylist({ userId, name, description="", tracks }: CreatePoplatedPlaylistArgs): Promise<void> {
    const playlist = await createPlaylist({ userId, name, description }).result

    addTracks(playlist.id, tracks.map(track => track.uri))
}

async function populateTrackFeatures(tracks: Track[]): Promise<Track[]> {
    const features = (await Promise.all(getTrackFeatures(tracks.map(track => track.id)).map(t => t.result))).flatMap(f => f)

    if (features.length !== tracks.length) throw new Error("Feature count does not match track count")

    return tracks.map((track, i) => {
        track.features = features[i]
        return track
    })
}


export {
    ApiCall,
    getCurrentUser, 
    getPlaylists, 
    getPlaylistItems, 
    getTrackFeatures, 
    populateTrackFeatures,
    createPopulatedPlaylist
}