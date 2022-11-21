import { PropsWithChildren } from 'react'
import { getToken } from './auth'
import { Playlist } from './models'

const BASE_URL = 'https://api.spotify.com/v1'

async function refreshToken() {
    // <
    return
}

interface ApiArgs extends PropsWithChildren {
    endpoint: string  // if starts with / prepends BASE_URL
    method: "GET" | "POST" | "PUT" | "DELETE"
    params?: any  // URL Params
    payload?: any  // Body Content TODO: Implement payload usage
}
async function callApi({ endpoint, method="GET", params={}, payload }: ApiArgs): Promise<any> {
    const token = getToken()

    // Build URL
    let urlString =  endpoint
    if (urlString.startsWith("/")) {
        urlString = BASE_URL + urlString
    }
    let url = new URL(urlString)
    Object.entries(params).forEach(([k, v]) => {
        url.searchParams.append(k, v as string)
    })
    
    // Build Non-url request components
    let options = {
        method,
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await fetch(
        url,
        options,
    )

    if (!response.ok) {
        throw "Unsuccessful api response"
    }

    return await response.json()
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
        method: "GET"
    })
    return response.items
}


export { callApi, getCurrentUser, getPlaylists }