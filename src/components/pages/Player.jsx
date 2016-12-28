import React from 'react'
import { render } from 'react-dom'
import { bindActionCreators  } from 'redux'
import { connect } from 'react-redux'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import * as playerAction from '../../actions/playerAction'
import PlayerCareer from './PlayerCareer';
import PlayerGamelog from './PlayerGamelog';
import PlayerInfo from './PlayerInfo';

class Player extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props.params.player_id);
        let { fetchPlayerBasicInfo } = this.props.actions;
        fetchPlayerBasicInfo(this.props.params.player_id);
    }
    
    _handleSelect(index, last) {
        let { fetchPlayerCareerStats, fetchPlayerGameLog } = this.props.actions;
        switch (index) {
            case 0:
                break;
            case 1:
                fetchPlayerGameLog(this.props.params.player_id);
                break;
            case 2:
            case 3:
                fetchPlayerCareerStats(this.props.params.player_id);
                break;
        }
    }

    render() {
        //let data = this.props.detailState[this.props.params.player_id];
        //console.log(this.props.detailState, this.props.params.player_id, this.props.detailState.players_info[this.props.params.player_id]);
        return (
            <div>
                <div>
                    
                </div>
                <Tabs onSelect={this._handleSelect.bind(this)}>
                    <TabList>
                        <Tab>Basic Info</Tab>
                        <Tab>Currnet Season</Tab>
                        <Tab>Career Regular</Tab>
                        <Tab>Career Playoff</Tab>
                    </TabList>
                    <TabPanel>
                        <PlayerInfo player_id={this.props.params.player_id} data={this.props.detailState.players_info[this.props.params.player_id]} />
                    </TabPanel>
                    <TabPanel>
                        <PlayerGamelog player_id={this.props.params.player_id} data={this.props.detailState.players_gamelog[this.props.params.player_id]} />
                    </TabPanel>
                    <TabPanel>
                        <PlayerCareer player_id={this.props.params.player_id} data={this.props.detailState.players_career[this.props.params.player_id]} type={'totals_regular'} />
                    </TabPanel>
                    <TabPanel>
                        <PlayerCareer player_id={this.props.params.player_id} data={this.props.detailState.players_career[this.props.params.player_id]} type={'totals_playoff'} />
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { 
        commonState: state.commonReducer,
        detailState: state.playerReducer
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
)(Player)
