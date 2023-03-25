const CLIENT_ID = "127702bf159a4f9e9e504f0952e6d105"
const AUTH_SCOPES = ["user-read-recently-played", "user-top-read", "playlist-read-private", "playlist-modify-public"]

const AUTH_URL_PARAMS = {
  client_id: CLIENT_ID,
  redirect_uri: "http://localhost:3000/callback",
  scope: AUTH_SCOPES.join(" "),
  response_type: "token",
}
const _auth_url = new URL("https://accounts.spotify.com/authorize")
Object.entries(AUTH_URL_PARAMS).forEach(([k, v]) => _auth_url.searchParams.append(k, v))
const AUTH_URL = _auth_url.toString()

export { AUTH_URL }
