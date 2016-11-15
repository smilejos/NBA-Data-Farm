import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import Hero from '../pages/Hero'
import PlayerSearch from '../pages/PlayerSearch'
import App from './Main'

const routes = (
    <Route component={App}>
		<Route path="/" component={PlayerSearch}/>
	  	<Route path="Hero" component={Hero} />
	  	<Route path="PlayerSearch" component={PlayerSearch} />
	</Route>
)

export default routes;