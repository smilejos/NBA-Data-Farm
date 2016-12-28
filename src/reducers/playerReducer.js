import { FETCH_PLAYERS, FETCH_PLAYER_INFO, FETCH_PLAYER_CAREER, FETCH_PLAYER_GAMELOG } from '../constants/actionTypes';
import * as lodash from 'lodash';

export default function playersReducer(state = {
    players: [],
    players_info: {},
    players_career: {},
    players_gamelog: {}
}, action) {
    let obj = {};
    switch (action.type) {
        case FETCH_PLAYERS:
            return Object.assign({}, state, {
                players: action.players
            });
        case FETCH_PLAYER_INFO:
            obj[action.player_id] = action.data;
            return lodash.assignIn({}, state, {
                players_info: lodash.defaultsDeep(state.players_info, obj)
            });
        case FETCH_PLAYER_CAREER:
            obj[action.player_id] = action.data;
            return lodash.assignIn({}, state, {
                players_career: lodash.defaultsDeep(state.players_career, obj)
            });
        case FETCH_PLAYER_GAMELOG:
            obj[action.player_id] = action.data;
            return lodash.assignIn({}, state, {
                players_gamelog: lodash.defaultsDeep(state.players_gamelog, obj)
            });
        default:
            return state;
    }
}
