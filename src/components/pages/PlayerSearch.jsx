import React from 'react'
import { render } from 'react-dom'
import { bindActionCreators  } from 'redux'
import { connect } from 'react-redux'
import * as playerAction from '../../actions/playerAction'

class PlayerSearch extends React.Component {
    constructor(props) {
        super(props);
        let { fetchPlayers } = this.props.actions;
        fetchPlayers();
    }

    _renderPlayComponent() {
        let list = this.props.playerState.players.map(function (player, index) {
           return <li key={index}>{player.name} at {player.teamAbbr}</li>
        });

        return list;
    }

    render() {
        let list = this._renderPlayComponent();
        return (
            <div>
                <h1>{this.props.commonState.isFetching ? "Fetching" : "Completed"}</h1>
                <h1>{this.props.commonState.isSuccess}</h1>
                {list}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { 
        commonState: state.commonReducer,
        playerState: state.playerReducer
    }
}

function mapDispatchToProps(dispatch) {
    return { 
        actions: bindActionCreators(playerAction, dispatch)
     }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerSearch)
