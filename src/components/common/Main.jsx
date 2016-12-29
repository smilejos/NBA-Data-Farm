import React from 'react'
import { render } from 'react-dom'
import { slide as Menu } from 'react-burger-menu'
import { Link } from 'react-router'
import { bindActionCreators  } from 'redux'
import { connect } from 'react-redux'
import Radium from 'radium'

let RadiumLink = Radium(Link);

class App extends React.Component {
    render() {
        
        return (
            <div id="container" className="container">
                <Menu width={ 280 } pageWrapId={ "page-wrap" } outerContainerId={ "container" }>
                    <RadiumLink className="menu-item" to="/PlayerSearch">Search</RadiumLink>
                    <RadiumLink className="menu-item" to="/Player/2544">Player</RadiumLink>
                </Menu>
                <div id="head-wrap" className="head-wrap">
                    NBA Stats
                </div>
                <main id="page-wrap" className="page-wrap">
                    {this.props.children}
                </main>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
