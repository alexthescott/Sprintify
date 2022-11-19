const BASE_URL = 'https://api.spotify.com/v1'
const CLIENT_ID = '127702bf159a4f9e9e504f0952e6d105'
const AUTH_SCOPES = [
    "user-read-recently-played",
    "user-top-read",
    "playlist-read-private",
    "playlist-modify-public"
]

const AUTH_URL_PARAMS = {
    client_id: CLIENT_ID,
    redirect_uri: "http://localhost:3000/callback",
    scope: AUTH_SCOPES.join(" "),
    response_type: 'token'
}

const _AUTH_URL = new URL("https://accounts.spotify.com/authorize")
Object.entries(AUTH_URL_PARAMS).forEach(([k, v]) => _AUTH_URL.searchParams.append(k, v))
const AUTH_URL = _AUTH_URL.toString()

const TOKEN_CACHE_KEY = "spotifyAccessToken"

const TOKEN_ANCHORS = ["#access_token=", "&"]
function cacheToken(auth_response_url: string): void {
    console.log(auth_response_url)
    let url_hash = new URL(auth_response_url).hash
    const token = url_hash.slice(
        url_hash.indexOf(TOKEN_ANCHORS[0]) + TOKEN_ANCHORS[0].length, 
        url_hash.indexOf(TOKEN_ANCHORS[1])
    )
    localStorage.setItem(TOKEN_CACHE_KEY, token)
}

function hasToken(): boolean {
    return localStorage.getItem(TOKEN_CACHE_KEY) !== null
}


interface ApiArgs {
    endpoint: string  // if starts with / prepends BASE_URL
    method: "GET" | "POST" | "PUT" | "DELETE"
    params?: any  // URL Params
    payload?: any  // Body Content
}
async function callApi({ endpoint, method, params, payload }: ApiArgs): Promise<any> {
    const token = localStorage.getItem(TOKEN_CACHE_KEY)

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

    return await response.json()
}


// Convenience API Methods
async function getPlaylists(): Promise<any[]> {
    return await callApi({
        endpoint: "/me/playlists",
        method: "GET"
    })
}


export { AUTH_URL, callApi, cacheToken, hasToken, getPlaylists }