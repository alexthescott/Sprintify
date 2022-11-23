import { User } from "../services/spotify/models"


const TOKEN_CACHE_KEY = "spotifyAccessToken"
const REDIRECT_CACHE_KEY = "callbackRedirectPath"
const USER_CACHE_KEY = "currentUser"

// Spotify Token
const TOKEN_ANCHORS = ["#access_token=", "&"]
function cacheToken(auth_response_url: string): void {
    console.log(auth_response_url)
    let url_hash = new URL(auth_response_url).hash

    const startTokenIndex = url_hash.indexOf(TOKEN_ANCHORS[0])
    if (startTokenIndex === -1) throw new Error("No access token")

    const token = url_hash.slice(
        startTokenIndex + TOKEN_ANCHORS[0].length, 
        url_hash.indexOf(TOKEN_ANCHORS[1])
    )
    if (token.length < 16) throw new Error("Invalid access token")  // idk the real token length

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


// Redirect
function cacheRedirect(path: string): void {
    localStorage.setItem(REDIRECT_CACHE_KEY, path)
}

function getRedirect(clear: boolean = true): string | null {
    const redirect = localStorage.getItem(REDIRECT_CACHE_KEY)
    clear && localStorage.removeItem(REDIRECT_CACHE_KEY)
    return redirect
}


// Current User
function cacheCurrentUser(user: User): void {
    localStorage.setItem(USER_CACHE_KEY, JSON.stringify(user))
}

function getCurrentUser(): User {
    const value = localStorage.getItem(USER_CACHE_KEY)
    if (value == null) throw new Error("No user cached")
    
    return JSON.parse(value) as User
}


// Misc
function removeKeys(keys: string[]): void {
    keys.forEach((k) => {
        localStorage.removeItem(k)
    })
}
function cleanCacheForLogout(): void {
    removeKeys([
        TOKEN_CACHE_KEY,
        REDIRECT_CACHE_KEY,
        USER_CACHE_KEY
    ])
}

function cleanCacheForReauth(): void {
    removeKeys([
        TOKEN_CACHE_KEY,
        USER_CACHE_KEY
    ])
}

export { 
    cacheToken, 
    clearToken, 
    getToken, 
    hasToken, 
    cacheRedirect, 
    getRedirect, 
    cacheCurrentUser,
    getCurrentUser,
    cleanCacheForLogout,
    cleanCacheForReauth
}