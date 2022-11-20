const REDIRECT_CACHE_KEY = "callbackRedirectPath"


function cacheRedirect(path: string): void {
    localStorage.setItem(REDIRECT_CACHE_KEY, path)
}

function getRedirect(clear: boolean = true): string | null {
    const redirect = localStorage.getItem(REDIRECT_CACHE_KEY)
    clear && localStorage.removeItem(REDIRECT_CACHE_KEY)
    return redirect
}

export { cacheRedirect, getRedirect }