import React from 'react'
import { render } from 'react-dom'
import { bindActionCreators  } from 'redux'
import { connect } from 'react-redux'
import * as heroActions from '../../actions/heroAction'

class Hero extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hero : ""
        }
    }

    _handleChange() {
        this.setState({
            hero: this.refs.txtHero.value
        });
    }

    _handleClick() {
        let { addHero } = this.props.actions;
        addHero(this.state.hero);
        this.state = {
            hero : ""
        }
    }

    render() {
       let list = this.props.state.heros.map(function (item, index) {
           return <li key={index}>{item}</li>
        });
        
        return (
            <div>
                <h1>Hello, This is My new Hero. {this.state.hero}</h1>
                <input type="text" ref="txtHero" value={this.state.hero} onChange={this._handleChange.bind(this)} />
                <button onClick={this._handleClick.bind(this)}>Add New Hero</button>
                <ul>
                    {list}
                </ul>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return { 
        state: state.heroReducer,
    }
}

function mapDispatchToProps(dispatch) {
    return { 
        actions: bindActionCreators(heroActions, dispatch)
     }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Hero)
