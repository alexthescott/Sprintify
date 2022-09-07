import { fromJS } from 'immutable';
import localStorage from 'local-storage';

import config from '../config';
import queryParametrize from '../services/query-parametrize';
import parseAccessToken from '../services/auth';
import history from '../services/history';

const SET_USER_LOGGED_IN = 'auth/SET_USER_LOGGED_IN';

export const authorizeUser = () => dispatch => {
    const loginOpts = {
        client_id: config.SPOTIFY_CLIENT_ID,
        redirect_uri: config.CALLBACK_URL,
        scope: config.SPOTIFY_AUTH_SCOPES,
        response_type: 'token',
    };
    const loginUrl = queryParametrize(config.SPOTIFY_AUTHORIZE_URL, loginOpts);
    window.location.href = loginUrl;
};

export const checkLogin = () => dispatch => {
    const accessToken = localStorage.get('accessToken');

    if (!accessToken) {
        history.replace('/login');
        window.location.reload();
    }

    return;
};

export const saveLogin = () => dispatch => {
    const accessToken = parseAccessToken();

    if (accessToken) {
        localStorage.set('accessToken', accessToken);

        let redirectTo = localStorage.get('redirectTo') || '/';
        localStorage.remove('redirectTo');
        
        if (redirectTo === '/login') {
            redirectTo = '/';
        }

        history.replace(redirectTo);
    } else {
        history.replace('/login');
    }

    return dispatch({type: SET_USER_LOGGED_IN})
};

const initialState = fromJS({
    isLoggedIn: false,
})

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER_LOGGED_IN:{
            return state.set('isLoggedIn', true);
        }    
        default: {
            return state;
        }
    }
}