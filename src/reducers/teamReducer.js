import { FETCH_TEAMS, FETCH_TEAM_DETAIL } from '../constants/actionTypes'

export default function teamReducer(state = {
    teams: [],
    team_details: []
    }, action) {
    switch (action.type) {
        case FETCH_TEAMS:
            console.log('action.players', action.players);
            return Object.assign({}, state, {
                teams: action.teams
            });
        case FETCH_TEAM_DETAIL:
            return Object.assign({}, state, {
                team_details: state.team_details.concat(action.team_detail)
            });
        default:
            return state;
    }
}
