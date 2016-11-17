import React from 'react'
import { render } from 'react-dom'
import { bindActionCreators  } from 'redux'
import { connect } from 'react-redux'
import * as playerAction from '../../actions/playerAction'
import teamAttr from '../../constants/teamAttribute'

class PlayerSearch extends React.Component {

    constructor(props) {
        super(props);
        let { fetchPlayers } = this.props.actions;
        this.state = {
            searchPlayerName: '',
            isSearchExistPlayer: false
        }

        fetchPlayers();
    }

    _handleChange() {
        this.setState({
            searchPlayerName: this.refs.txtName.value,
            isSearchExistPlayer: this.refs.chkExist.checked
        });
    }

    _filterPlayers() {
        if (this.state.searchPlayerName.length > 1) {
            return this.props.playerState.players.filter(
                item => item.name.toLowerCase().indexOf(this.state.searchPlayerName.toLowerCase()) > -1
                    && (this.state.isSearchExistPlayer ? item.isExist : true)
            )
        } else { 
            return [];
        }
    }

    _renderPlayComponent() {
        let list = this._filterPlayers().map(function (player, index) {
            let teamObj = teamAttr[player.teamAbbr.toLowerCase()];
            let imgStyle = { backgroundColor: teamObj.color };
            return <li key={index}>{player.name}at {player.teamAbbr} <img className="team" style={imgStyle} src={teamObj.logo} /></li>
        });
        return list;
    }

    render() {
        let list = this._renderPlayComponent();
        return (
            <div>
                <input type="text" ref="txtName" value={this.state.searchPlayerName} onChange={this._handleChange.bind(this)} />
                <input type="checkbox" ref="chkExist" checked={this.state.isSearchExistPlayer} onChange={this._handleChange.bind(this)} />
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
