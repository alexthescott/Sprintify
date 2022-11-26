import { PropsWithChildren } from 'react'
import { getToken } from '../../utils/cache'
import { Playlist, PlaylistItem, Track, TrackFeatures } from './models'

const BASE_URL = 'https://api.spotify.com/v1'


interface ApiArgs extends PropsWithChildren {
    endpoint: string  // if starts with / prepends BASE_URL
    method?: "GET" | "POST" | "PUT" | "DELETE"
    params?: any  // URL Params
    payload?: any  // Body Content TODO: Implement payload usage
    resolvePages?: boolean  // Resolve pages
}
async function callApi({ endpoint, method="GET", params={}, payload, resolvePages=false }: ApiArgs): Promise<any | any[]> {
    const token = getToken()

    // Build URL
    let urlString = endpoint
    if (urlString.startsWith("/")) {
        urlString = BASE_URL + urlString
    }
    let url = new URL(urlString)
    Object.entries(params).forEach(([k, v]) => {
        url.searchParams.append(k, v as string)
    })
    
    // Build Non-url request components
    const headers = {
        Authorization: `Bearer ${token}`
    }
    let options = {
        method,
        headers
    }

    const response = await fetch(
        url,
        options,
    )

    if (!response.ok) {
        throw new Error("Unsuccessful api response")
    }

    let content = await response.json()
    if (!resolvePages) return content

    const total = content.total
    const limit = content.limit

    if (limit <= 0) throw new Error("Limit must be greater than 0")

    let pageContent = [content]
    
    let apiPromises = []
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

async function populateTrackFeatures(tracks: Track[]): Promise<Track[]> {
    const features = await getTrackFeatures(tracks.map(track => track.id))

    if (features.length !== tracks.length) throw new Error("Feature count does not match track count")

    return tracks.map((track, i) => {
        track.features = features[i]
        return track
    })
}


export { callApi, getCurrentUser, getPlaylists, getPlaylistItems, getTrackFeatures, populateTrackFeatures }