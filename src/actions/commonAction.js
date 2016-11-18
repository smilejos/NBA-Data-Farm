import { FETCHING, FETCH_SUCCESS, FETCH_FAIL } from '../constants/actionTypes';

export function fetchData() {
	return {
        type: FETCHING,
	};
}

export function fetchDataSuccess() {
	return {
        type: FETCH_SUCCESS,
	};
}

export function fetchDataFail() {
	return {
        type: FETCH_FAIL,
	};
}
