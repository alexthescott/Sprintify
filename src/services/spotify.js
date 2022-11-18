import axios from "axios";
import localStorage from "local-storage";

import config from '../config';
import queryParametrize from '../services/query-parametrize';


const BASE_URL = "https://api.spotify.com/v1/"


const hasAccessToken = () => {
    return getAccessToken() !== null
}

const getAccessToken = () => {
    return localStorage.get('accessToken')
}

const getAuthUrl = () => {
    const loginOpts = {
        client_id: config.SPOTIFY_CLIENT_ID,
        redirect_uri: config.CALLBACK_URL,
        scope: config.SPOTIFY_AUTH_SCOPES,
        response_type: 'token',
    };
    return queryParametrize(config.SPOTIFY_AUTHORIZE_URL, loginOpts);
}

const callApi = async (
    endpoint,
    method,
    params = {},
    data = {},
) => {
    const token = getAccessToken()
    if (token === null) {
        throw "no access token, user must sign in"
    }

    const request = {
        method,
        data,
        params,
        // baseUrl: ,
        url: BASE_URL + endpoint,
        headers: { Authorization: `Bearer ${token}` }
    }

    const response = await axios(request)



    return response
}

// Convenience methods
const getPlaylists = () => {
    return callApi(
        "me/playlists",
        "GET",
    )
}

export { getPlaylists, getAuthUrl, getAccessToken, hasAccessToken }
