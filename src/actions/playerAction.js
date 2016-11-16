import { FETCH_PLAYERS, FETCH_PLAYER_DETAIL } from '../constants/playerActionTypes';
import { fetchData, fetchDataSuccess, fetchDataFail } from './commonAction';

const fetchSetting = {
    mode: 'no-cors',
    headers: {
        'Content-Type': 'application/json'
    }
};

function shouldFetchFromNetwork(state) {
    return state.playerReducer.players.length == 0;
}

function fetchPlayersFromNetwork() {
    return (dispatch) => {
        dispatch(fetchData());
        return fetch('http://stats.nba.com/stats/commonallplayers?IsOnlyCurrentSeason=1&LeagueID=00&Season=2016-17')
            .then(response => response.json())
            .then(json => dispatch(receivePlayersFromNetwork(json)))
            .catch(function (ex) { 
                console.log(ex);
            });;
    };
}
function receivePlayersFromNetwork(players) {
    return (dispatch) => {
        dispatch(fetchDataSuccess());
        players = players['resultSets'][0]['rowSet'].map(item => {
            let nameArray = item[1].split(', ');
            return {
                playerID: item[0],
                firstName: nameArray[1], //Stephen
                lastName: nameArray[0], //Curry
                name: nameArray[1] + ' ' + nameArray[0],
                teamID: item[7],
                teamCity: item[8],
                teamName: item[9],
                teamAbbr: item[10],
                fromYear: item[4],
                toYear: item[5]
            }
        });
        dispatch(receivePlayers(players));
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
