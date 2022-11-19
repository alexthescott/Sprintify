import { getToken } from './auth'

const BASE_URL = 'https://api.spotify.com/v1'

async function refreshToken() {
    // <
    return
}

interface ApiArgs {
    endpoint: string  // if starts with / prepends BASE_URL
    method: "GET" | "POST" | "PUT" | "DELETE"
    params?: any  // URL Params
    payload?: any  // Body Content
}
async function callApi({ endpoint, method, params, payload }: ApiArgs): Promise<any> {
    const token = getToken()

    console.log("Token", token)

    // Build URL
    let urlString =  endpoint
    if (urlString.startsWith("/")) {
        urlString = BASE_URL + urlString
    }
    let url = new URL(urlString)

    for (let k in params) {
        url.searchParams.append(k, params[k])
    }
    console.log("api call url", url.toString())
    
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

    if (response.status === 401) {
        return
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

async function getPlaylists(): Promise<any[]> {
    return await callApi({
        endpoint: "/me/playlists",
        method: "GET"
    })
}


export { callApi, getCurrentUser, getPlaylists }