import ENV from '../env';

const config = {
    API_URL: 'https://api.spotify.com/v1',
    SPOTIFY_AUTHORIZE_URL: "https://accounts.spotify.com/authorize",
    SPOTIFY_AUTH_SCOPES: "user-read-recently-played user-top-read playlist-modify-public",
    SPOTIFY_CLIENT_ID: ENV.SPOTIFY_CLIENT_ID,
    CALLBACK_URL: `http://localhost:3000/callback`,
};

export default config;