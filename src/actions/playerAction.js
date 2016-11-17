import { FETCH_PLAYERS, FETCH_PLAYER_DETAIL } from '../constants/playerActionTypes';
import { fetchData, fetchDataSuccess, fetchDataFail } from './commonAction';
import service from '../services'

function shouldFetchFromNetwork(state) {
    return state.playerReducer.players.length == 0;
}

function fetchPlayersFromNetwork() {
    return (dispatch) => {
        dispatch(fetchData());
        console.log(service);
        return service.getPlayerList().then(function (data) {
            dispatch(fetchDataSuccess());
            dispatch(receivePlayers(data));
        });
    };
}

function receivePlayers(players) {
    return {
        type: FETCH_PLAYERS,
        players: players
    }
}

export function fetchPlayers() {
    return (dispatch, getState) => {
        if (shouldFetchFromNetwork(getState())) {
            console.log('FetchFromNetwork');
            return dispatch(fetchPlayersFromNetwork());
        } else {
            console.log('FetchFromLocal');
            return dispatch(fetchDataSuccess());
        }
    }   
}
