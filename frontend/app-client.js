
import React from 'react'
import Router from 'react-router'



import APP from './components/APP' //mother
import Index from './components/Index' //child
import Dashboard from './components/Dashboard' //child
import UserLists from './components/UserLists' //child
import CreateUser from './components/CreateUser' //child
import ViewRecord from './components/ViewRecord' //child
import ManualDTR from './components/ManualDTR' //child
import BirthdayCorner from './components/BirthdayCorner' //child
import DTRModel from './components/DTRModel' //child
import Whoops404 from './components/Whoops404' //child


var { Route, DefaultRoute, NotFoundRoute } = Router;


var routes = (
	<Route handler={APP}>
		<DefaultRoute handler={Index} />
		<Route name="index" path="index" handler={Index}></Route>
		<Route name="dashboard" path="dashboard" handler={Dashboard}></Route>
		<Route name="manual-dtr" path="manual-dtr" handler={ManualDTR}></Route>
		<Route name="users-list" path="users-list" handler={UserLists}></Route>
		<Route name="view-record" path="view-record" handler={ViewRecord}></Route>
		<Route name="birthday-corner" path="birthday-corner" handler={BirthdayCorner}></Route>
		<Route name="model" path="model" handler={DTRModel}></Route>
		<Route name="create-user" path="create-user" handler={CreateUser}></Route>
		<NotFoundRoute handler={Whoops404} />
	</Route>
);

Router.run(routes, function(Handler) {
	React.render(<Handler />, document.getElementById('react-container'));
});
