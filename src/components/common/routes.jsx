import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import Hello from '../pages/Hello'
import PlayerSearch from '../pages/PlayerSearch'
import App from './Main'

const routes = (
    <Route component={App}>
		<Route path="/" component={PlayerSearch}/>
	  	<Route path="Hello" component={Hello} />
	  	<Route path="PlayerSearch" component={PlayerSearch} />
	</Route>
)

export default routes;