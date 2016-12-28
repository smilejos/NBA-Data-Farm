import React from 'react';
import { render } from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
class PlayerGamelog extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props.data);
    }

    _renderEmpty() {
        console.log('_renderEmpty');
        return (
            <div></div>
        );
    }

    _renderHighlight(value, condition) {
        let className = condition ? 'stats_highlight' : 'stats_normal';
        return <div className={className}>{value}</div>;
    }

    _renderFGFormatter(cell, row) {
        let value = row.fgm + '/' + row.fga;
        return this._renderHighlight(value, row.fgm >= 10 & row.fg_pct >= 0.5);
    }

    _render3PTFormatter(cell, row) {
        let value = row.fg3m + '/' + row.fg3a;
        return this._renderHighlight(value, row.fg3m >= 4 & row.fg3_pct >= 0.4);
    }

    _renderFTFormatter(cell, row) {
        let value = row.ftm + '/' + row.fta;
        return this._renderHighlight(value, row.ftm >= 10);
    }

    _renderFormatter(criteria, cell, row) {
        return this._renderHighlight(cell, cell >= criteria);
    }

    _renderWLFormatter(cell, row) {
        let className = cell == "W" ? 'stats_highlight' : 'stats_unqualified';
        return <div className={className}>{cell}</div>;
    }

    _renderTable() {
        console.log('_renderTable');
        return (
            <BootstrapTable data={this.props.data} tableHeaderClass='grid_header' tableBodyClass='grid_body' height='600px'>
                <TableHeaderColumn width='120' dataAlign='center' dataField="game_date" isKey>Game Date</TableHeaderColumn>
                <TableHeaderColumn width='100' dataAlign='left' dataField="matchup">Matchup</TableHeaderColumn>
                <TableHeaderColumn width='50' dataAlign='center' dataField="wl" dataFormat={this._renderWLFormatter.bind(this)}>W/L</TableHeaderColumn>
                <TableHeaderColumn width='40' dataAlign='center' dataField="min">Min</TableHeaderColumn>
                <TableHeaderColumn width='50' dataAlign='center' dataField="fgm" dataFormat={this._renderFGFormatter.bind(this)}>FG</TableHeaderColumn>
                <TableHeaderColumn width='50' dataAlign='center' dataField="fgm" dataFormat={this._render3PTFormatter.bind(this)}>3PT</TableHeaderColumn>
                <TableHeaderColumn width='50' dataAlign='center' dataField="fgm" dataFormat={this._renderFTFormatter.bind(this)}>FT</TableHeaderColumn>
                <TableHeaderColumn width='50' dataAlign='center' dataField="oreb" dataFormat={this._renderFormatter.bind(this, 3)}>OREB</TableHeaderColumn>
                <TableHeaderColumn width='50' dataAlign='center' dataField="dreb" dataFormat={this._renderFormatter.bind(this, 10)}>DREB</TableHeaderColumn>
                <TableHeaderColumn width='40' dataAlign='center' dataField="reb" dataFormat={this._renderFormatter.bind(this, 10)}>REB</TableHeaderColumn>
                <TableHeaderColumn width='40' dataAlign='center' dataField="ast" dataFormat={this._renderFormatter.bind(this, 10)}>AST</TableHeaderColumn>
                <TableHeaderColumn width='40' dataAlign='center' dataField="stl" dataFormat={this._renderFormatter.bind(this, 3)}>STL</TableHeaderColumn>
                <TableHeaderColumn width='40' dataAlign='center' dataField="blk" dataFormat={this._renderFormatter.bind(this, 3)}>BLK</TableHeaderColumn>
                <TableHeaderColumn width='40' dataAlign='center' dataField="tov">TO</TableHeaderColumn>
                <TableHeaderColumn width='40' dataAlign='center' dataField="pf">PF</TableHeaderColumn>
                <TableHeaderColumn width='40' dataAlign='center' dataField="pts" dataFormat={this._renderFormatter.bind(this, 30)}>PTS</TableHeaderColumn>
                <TableHeaderColumn width='30' dataAlign='center' dataField="plus_minus" dataFormat={this._renderFormatter.bind(this, 20)}>+/-</TableHeaderColumn>
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

export default PlayerGamelog