import React from 'react';
import { render } from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
class PlayerCareer extends React.Component {

    constructor(props) {
        super(props);
    }

    _renderEmpty() {
        console.log('_renderEmpty');
        return (
            <div></div>
        );
    }

    _renderFGFormatter(cell, row) {
        let className = row.fgm >= 10 & row.fg_pct >= 0.5 ? 'stats_highlight' : 'stats_normal';
        return <div className={className}>{row.fgm}/{row.fga}</div>;
    }

    _render3PTFormatter(cell, row) {
        let className = row.fg3m >= 5 & row.fg3_pct >= 0.4 ? 'stats_highlight' : 'stats_normal';
        return <div className={className}>{row.fg3m}/{row.fg3a}</div>;
    }

    _renderFTFormatter(cell, row) {
        let className = row.ftm >= 10? 'stats_highlight' : 'stats_normal';
        return <div className={className}>{row.ftm}/{row.fta}</div>;
    }

    _renderTable() {
        console.log('_renderTable');
        return (
            <BootstrapTable data={this.props.data[this.props.type]} striped hover tableHeaderClass='grid_header' tableBodyClass='grid_body' height='600px'>
                <TableHeaderColumn width='60' dataAlign='center' dataField="season_id" isKey>Season</TableHeaderColumn>
                <TableHeaderColumn width='50' dataAlign='center' dataField="team_abbreviation">Team</TableHeaderColumn>
                <TableHeaderColumn width='50' dataAlign='center' dataField="player_age">Age</TableHeaderColumn>
                <TableHeaderColumn width='40' dataAlign='center' dataField="gp">GP</TableHeaderColumn>
                <TableHeaderColumn width='40' dataAlign='center' dataField="gs">GS</TableHeaderColumn>
                <TableHeaderColumn width='40' dataAlign='center' dataField="min">MIN</TableHeaderColumn>
                <TableHeaderColumn width='50' dataAlign='center' dataField="fgm">FGM</TableHeaderColumn>
                <TableHeaderColumn width='50' dataAlign='center' dataField="fga">FGA</TableHeaderColumn>
                <TableHeaderColumn width='50' dataAlign='center' dataField="fg_pct">FG%</TableHeaderColumn>
                <TableHeaderColumn width='50' dataAlign='center' dataField="fg3m">3PM</TableHeaderColumn>
                <TableHeaderColumn width='50' dataAlign='center' dataField="fg3a">3PA</TableHeaderColumn>
                <TableHeaderColumn width='50' dataAlign='center' dataField="fg3_pct">3P%</TableHeaderColumn>
                <TableHeaderColumn width='50' dataAlign='center' dataField="ftm">FTM</TableHeaderColumn>
                <TableHeaderColumn width='50' dataAlign='center' dataField="fta">FTA</TableHeaderColumn>
                <TableHeaderColumn width='50' dataAlign='center' dataField="ft_pct">FT%</TableHeaderColumn>
                <TableHeaderColumn width='50' dataAlign='center' dataField="oreb">OREB</TableHeaderColumn>
                <TableHeaderColumn width='50' dataAlign='center' dataField="dreb">DREB</TableHeaderColumn>
                <TableHeaderColumn width='40' dataAlign='center' dataField="reb">REB</TableHeaderColumn>
                <TableHeaderColumn width='40' dataAlign='center' dataField="ast">AST</TableHeaderColumn>
                <TableHeaderColumn width='40' dataAlign='center' dataField="stl">STL</TableHeaderColumn>
                <TableHeaderColumn width='40' dataAlign='center' dataField="blk">BLK</TableHeaderColumn>
                <TableHeaderColumn width='40' dataAlign='center' dataField="tov">TO</TableHeaderColumn>
                <TableHeaderColumn width='40' dataAlign='center' dataField="pf">PF</TableHeaderColumn>
                <TableHeaderColumn width='40' dataAlign='center' dataField="pts">PTS</TableHeaderColumn>
            </BootstrapTable>
        )
    }

    render() {
        let data = this.props.data ? this._renderTable() : this._renderEmpty();
        return (
            <div className='stats_container'>
                {data}
            </div>
        );
    }
}

export default PlayerCareer