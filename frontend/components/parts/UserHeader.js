import React from 'react'
import { Link } from 'react-router';
class UserHeader extends React.Component{
  constructor () {
    super()
    this.state = {
      fullname: '',
      email: '',
      userType: '',
      position: '',
      avatar: ''
     }
  }

  componentDidMount(){
    const currentUser = this.props.currentUser;
    this.setState({fullname: "Welcome " + currentUser['user'].first_name + currentUser['user'].last_name});
    this.setState({email: currentUser['user'].email});
    this.setState({userType: currentUser['user'].userType});
    this.setState({position: currentUser['user'].position});
    this.setState({avatar: currentUser['user'].avatar});
  }
	render() {
    const currentUser = this.props.currentUser;
		return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link to="/dashboard" className="navbar-brand"><span className = "glyphicon glyphicon-home"></span> {this.state.fullname}</Link>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
            <ul className="nav navbar-nav">

              <li><Link to="/manual-dtr"><span className = "glyphicon glyphicon-time"></span> Manual Time In</Link></li>
              {currentUser['user'].userType == "admin" ? <li><Link to="/create-user"><span className = "glyphicon glyphicon-plus"></span> Create User</Link></li>  : ''}
              <li><Link to="/users-list"><span className = "glyphicon glyphicon-list-alt"></span> List of Users</Link></li>
              <li><Link to="/view-record"><span className = "glyphicon glyphicon-eye-open"></span> View Your Record</Link></li>
              <li><Link to="/birthday-corner"><span className = "glyphicon glyphicon-calendar"></span> Birthday Corner</Link></li>
              <li><Link to="/model"><span className = "glyphicon glyphicon-star"></span> DTR Model of the Month</Link></li>
              <li><a href = "#" data-toggle="modal" data-target="#modalLogout"><span className = "glyphicon glyphicon-off"></span> Logout</a ></li>

            </ul>

          </div>
        </div>
      </nav>
		);
	}
}


module.exports = UserHeader;
