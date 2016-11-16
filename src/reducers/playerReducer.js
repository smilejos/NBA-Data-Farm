import { FETCH_PLAYERS, FETCH_PLAYER_DETAIL } from '../constants/playerActionTypes'

export default function playersReducer(state = {
    players: [],
    player_details: []
    }, action) {
    switch (action.type) {
        case FETCH_PLAYERS:
            console.log('action.players', action.players);
            return Object.assign({}, state, {
                players: action.players
            });
        case FETCH_PLAYER_DETAIL:
            return Object.assign({}, state, {
                player_details: state.player_details.concat(action.player_detail)
            });
        default:
            return state;
    }
}
