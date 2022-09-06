import { fromJS } from 'immutable';
import { apiCall } from '../services/api';

const FETCH_USER_PROFILE = 'user/FETCH_USER_PROFILE';
const FETCH_USER_PROFILE_SUCCESS = 'user/FETCH_USER_PROFILE_SUCCESS';

export const getUser = state => state.user.get('user');

export const fetchUserProfile = () => 
apiCall({
    type: FETCH_USER_PROFILE,
    url: '/me',
});

const initialState = fromJS({
    user: {},
    isLoadingUser: false,
})

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_USER_PROFILE_SUCCESS: {
            return state.set('user', fromJS(action.payload.data));
        }

        default: {
            return state;
        }
    }
}