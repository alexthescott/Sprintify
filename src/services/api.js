import localStorage from 'local-storage';
import { get, isNil } from 'lodash';
import { getErrorActionType } from './axios';
import history from './history';
import { authorizeUser } from '../concepts/auth';
import { getCurrentPathName } from '../concepts/route';

const getAccessToken = () => localStorage.get('accessToken');

const getAuthHeader = token => {
    if (token) {
        return { Authorization: `Bearer ${token}` };
    }

    return {};
}

const isUnauthorized = status => status === 401;

const redirectToLogin = () => (dispatch, getState) => {
    const accessToken = getAccessToken();
    const state = getState();
    const pathName = getCurrentPathName(state);

    localStorage.set('redirectTo', pathName);

    if (!isNil(accessToken)){
        return dispatch(authorizeUser());
    }

    history.replace('/login');
}

const handleApiError = response => {
    const status = get(response, 'error.response.status');
    const {error, action, next, options, dispatch} = response;

    if (isUnauthorized(status)) {
        return dispatch(redirectToLogin());
    }

    const errorObject = {
        text: get(error, 'response.statusText', error.message),
        code: get(error, 'response.status'),
    };

    const nextAction = {
        type: getErrorActionType(action, options),
        error: errorObject,
        payload: get(action, 'payload'),
    };

    next(nextAction);
    return nextAction
}

export const apiCall = ({
    endpoint,
    type,
    types,
    payload,
    method = 'GET',
    ...options
}) => dispatch => {
    const token = getAccessToken();
    const authHeader = getAuthHeader(token);

    return dispatch({
        type,
        types,
        payload: {
            ...payload,
            requests: {
                url: endpoint,
                method,
                headers: {
                    ...authHeader,
                },
                ...options,
            },
            options: {
                onError: handleApiError
            }
        }
    })
}