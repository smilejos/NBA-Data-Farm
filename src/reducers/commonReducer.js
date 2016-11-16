import { FETCHING, FETCH_SUCCESS, FETCH_FAIL } from '../constants/commonActionTypes'
//import * as lodash from 'lodash'

export default function commonReducer(state = {
        isFetching: false,
        isSuccess: true
    }, action) {
    switch (action.type) {
        case FETCHING:
            return Object.assign({}, state, {
                isFetching: true
            });
        case FETCH_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isSuccess: true
            });
        case FETCH_FAIL:
            return Object.assign({}, state, {
                isFetching: false,
                isSuccess: false
            });
        default:
            return state;
    }
}
