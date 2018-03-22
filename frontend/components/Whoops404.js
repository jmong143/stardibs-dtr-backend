var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Whoops404 = React.createClass({
	render() {
		return (
			<div className="container">
        <div className="row">
  				<h1>404 Not Found...</h1>
  				<p>We cannot find the page that you have requested. Were you looking for one of these: </p>
          <li><Link to="/manual-dtr"><span className = "glyphicon glyphicon-time"></span> Manual Time In</Link></li>
          <li><Link to="/users-list"><span className = "glyphicon glyphicon-list-alt"></span> List of Users</Link></li>
          <li><Link to="/view-record"><span className = "glyphicon glyphicon-eye-open"></span> View Your Record</Link></li>
          <li><Link to="/birthday-corner"><span className = "glyphicon glyphicon-calendar"></span> Birthday Corner</Link></li>
          <li><Link to="/model"><span className = "glyphicon glyphicon-star"></span> DTR Model of the Month</Link></li>
        </div>
			</div>
		);
	}
});

module.exports = Whoops404;
