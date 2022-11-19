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
    response_type: 'token',
}
const _auth_url = new URL("https://accounts.spotify.com/authorize")
Object.entries(AUTH_URL_PARAMS).forEach(([k, v]) => _auth_url.searchParams.append(k ,v))
const AUTH_URL = _auth_url.toString()

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

function clearToken(): void {
    localStorage.removeItem(TOKEN_CACHE_KEY)
}

function getToken(): string | null {
    return localStorage.getItem(TOKEN_CACHE_KEY)
}

function hasToken(): boolean {
    return getToken() !== null
}

export { AUTH_URL, cacheToken, clearToken, getToken, hasToken }