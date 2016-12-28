import React from 'react';
import { render } from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table, Column, Cell } from 'fixed-data-table';

class PlayerInfo extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props.data);
    }

    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default PlayerInfo