import React from 'react'
import { render } from 'react-dom'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
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
        let raw = this._filterPlayers();
        let list = raw.map(function (player, index) {
            let teamObj = teamAttr[player.teamAbbr.toLowerCase()];
            let imgStyle = { backgroundColor: teamObj ? player.color : "#fff" };
            return (
                <div key={index}>
                    <img className="team" style={imgStyle} src={teamObj ? teamObj.logo : ""} />
                    <Link to={"/Player/" + player.id}>{player.name}</Link> at {player.teamAbbr}
                </div>
            )
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
                <div>
                    {list}
                </div>
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
