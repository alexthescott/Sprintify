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

export const apiCall = ({
    endpoint,
    type,
    payload,
    method = 'GET',
    ...options
}) => dispatch => {
    const token = getAccessToken();
    const authHeader = getAuthHeader(token);
}