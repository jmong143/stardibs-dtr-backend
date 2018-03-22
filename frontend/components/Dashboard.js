import React from 'react';
import UserHeader from './parts/UserHeader';
import Modal from './parts/Modal';

class Dashboard extends React.Component{
  constructor () {
    super()
    this.state = {
      userData: []
     }
  }
	render() {
    if (localStorage.getItem("dtrCurrentUser") === null) {
      window.location = "http://localhost:5000/#/";
    }else{
      var currentUser = JSON.parse(localStorage.getItem("dtrCurrentUser"));
      return (
  			<div id="">
        <UserHeader currentUser = {currentUser}/>
        <div className = "col-md-1"></div>
        <div className = "col-md-6">
          <div className="panel panel-info">
            <div className="panel-heading">
              <h3 className="panel-title text-primary"><span className = "glyphicon glyphicon-time"></span> Date Time Record</h3>
            </div>
            <div className="panel-body">
              <center><h3><span className = "glyphicon glyphicon-calendar"></span> { moment().format('LL') }</h3>
              <a data-toggle="modal" data-target="#modalTimeIn" className = "btn btn-primary btnLarge"><span className = "glyphicon glyphicon-ok"></span> Time In </a> &nbsp;
              <a data-toggle="modal" data-target="#modalTimeOut" className = "btn btn-danger btnLarge"><span className = "glyphicon glyphicon-off"></span> Time Out </a></center>
            </div>
          </div>
        </div>
        <div className = "col-md-4">
          <div className="alert alert-dismissible alert-info">
              <img src = {currentUser['user'].avatar} className = "img-responsive"/>
              <h5>Position: {currentUser['user'].position}</h5>
              <h5>Username: {currentUser['user'].username}</h5>
              <h5>Fullname: {currentUser['user'].first_name} {currentUser['user'].last_name}</h5>
              <h5>Email: {currentUser['user'].email}</h5>
              <h5>User Type: {currentUser['user'].userType}</h5>
              <a data-toggle="modal" data-target="#modalEditProfile" className = "btn btn-success"><span className = "glyphicon glyphicon-edit"></span> Edit Profile</a> &nbsp;
              <a  data-toggle="modal" data-target="#modalChangePassword" className = "btn btn-primary"><span className = "glyphicon glyphicon-alert"></span> Change Password</a>
          </div>
        </div>
        <div className = "col-md-1"></div>



        <Modal currentUser = {currentUser}/>
  			</div>
  		);
    }
	}
};

module.exports = Dashboard;
