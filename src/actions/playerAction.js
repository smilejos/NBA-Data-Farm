import { FETCH_PLAYERS, FETCH_PLAYER_INFO, FETCH_PLAYER_CAREER, FETCH_PLAYER_GAMELOG } from '../constants/actionTypes';
import { fetchData, fetchDataSuccess, fetchDataFail } from './commonAction';
import service from '../services'

function shouldFetchPlayersFromNetwork(state) {
    return state.playerReducer.players.length == 0;
}

function shouldFetchPlayerDetailFromNetwork(state, player_id, field) {
    return state.playerReducer[field][player_id] === undefined;
}

function fetchPlayersFromNetwork() {
    return (dispatch) => {
        dispatch(fetchData());
        return service.getPlayerList().then(function (data) {
            dispatch(fetchDataSuccess());
            dispatch(receivePlayers(data));
        });
    };
}

function fetchPlayerDetailFromNetwork(player_id, fetchMethod, fetchType) {
    return (dispatch) => {
        dispatch(fetchData());
        return fetchMethod(player_id).then(function (data) {
            console.log(player_id, data);
            dispatch(fetchDataSuccess());
            dispatch(receivePlayerDetail(player_id, data, fetchType));
        });
    };
}

function receivePlayers(players) {
    return {
        type: FETCH_PLAYERS,
        players: players
    }
}

function receivePlayerDetail(player_id, data, fetchType) {
    return {
        type: fetchType,
        player_id,
        data
    }
}

export function fetchPlayers() {
    return (dispatch, getState) => {
        if (shouldFetchPlayersFromNetwork(getState())) {
            return dispatch(fetchPlayersFromNetwork());
        } else {
            return dispatch(fetchDataSuccess());
        }
    }   
}

export function fetchPlayerCareerStats(player_id) {
    return (dispatch, getState) => {
        if (shouldFetchPlayerDetailFromNetwork(getState(), player_id, 'players_career')) {
            return dispatch(fetchPlayerDetailFromNetwork(player_id, service.getPlayerCareerStats, FETCH_PLAYER_CAREER));
        } else {
            return dispatch(fetchDataSuccess());
        }
    }   
}

export function fetchPlayerBasicInfo(player_id) {
    return (dispatch, getState) => {
        if (shouldFetchPlayerDetailFromNetwork(getState(), player_id, 'players_info')) {
            return dispatch(fetchPlayerDetailFromNetwork(player_id, service.getPlayerInfo, FETCH_PLAYER_INFO));
        } else {
            return dispatch(fetchDataSuccess());
        }
    }   
}

export function fetchPlayerGameLog(player_id) {
    return (dispatch, getState) => {
        if (shouldFetchPlayerDetailFromNetwork(getState(), player_id, ['players_gamelog'])) {
            return dispatch(fetchPlayerDetailFromNetwork(player_id, service.getPlayerLog, FETCH_PLAYER_GAMELOG));
        } else {
            return dispatch(fetchDataSuccess());
        }
    }   
}

