import { PropsWithChildren } from 'react'
import { getToken } from './auth'
import { Playlist } from './models'

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
        throw "Unsuccessful api response"
    }

    let content = await response.json()
    if (!resolvePages) return content

    const total = content.total
    const limit = content.limit

    if (limit <= 0) throw "Limit must be greater than 0"

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


export { callApi, getCurrentUser, getPlaylists }