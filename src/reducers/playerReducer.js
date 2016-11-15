"use strict";
import { FETCH_PLAYERS, FETCH_PLAYER_DETAIL } from '../constants/playerActionTypes'
import * as lodash from 'lodash'

export default function playersReducer(state = {
    players: [],
    player_details: []
    }, action) {
    switch (action.type) {
        case FETCH_PLAYERS:
            return lodash.assignIn({}, state, {
                players: action.players
            });
        case FETCH_PLAYER_DETAIL:
            return lodash.assignIn({}, state, {
                player_details: state.player_details.concat(action.player_detail)
            });
        default:
            return state;
    }
}
