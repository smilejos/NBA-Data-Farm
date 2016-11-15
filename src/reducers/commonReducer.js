"use strict";
import { FETCHING, FETCH_SUCCESS, FETCH_FAIL } from '../constants/commonActionTypes'
import * as lodash from 'lodash'

export default function commonReducer(state = {
        isFetching: false,
        isSuccess: true
    }, action) {
    switch (action.type) {
        case FETCHING:
            return lodash.assignIn({}, state, {
                isFetching: true
            });
        case FETCH_SUCCESS:
            return lodash.assignIn({}, state, {
                isFetching: false,
                isSuccess: true
            });
        case FETCH_FAIL:
            return lodash.assignIn({}, state, {
                isFetching: false,
                isSuccess: false
            });
        default:
            return state;
    }
}
