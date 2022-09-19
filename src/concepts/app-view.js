import { createStructuredSelector } from 'reselect';

import { checkLogin } from "./auth";
import { fetchUserProfile, getUser } from "./user";

export const getAppViewData = createStructuredSelector({
    user: getUser
})

export const startAppView = () => dispatch => {
    console.log('Starting app view...')
    dispatch(checkLogin());
}