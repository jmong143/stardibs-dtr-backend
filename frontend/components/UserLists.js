import React from 'react';
import UserHeader from './parts/UserHeader';
import Modal from './parts/Modal';

class UserLists extends React.Component{
  constructor () {
    super()
    this.state = {
      userList: [],
      userDetailsEmail: '',
      userDetailsFullName: '',
      userDetailsPosition: '',
      userDetailsAvatar: '',
      userDetailsUsername: ''
     }
  }
  componentDidMount(){
    this.retrieveAllUsers();
  }

  retrieveAllUsers(){
    var THIS = this;
    $.ajax({
      url: 'http://localhost:5100/dtr-auth/user-lists',
      type: 'GET',
      data: {},
      dataType: 'json',
      success: function(data){
        console.log("DATA--> " + JSON.stringify(data))
        THIS.setState({userList: data})
      },
      error: function(err){
      }
    });
  }


  viewUserData(id){
    var THIS = this;
    $.ajax({
      url: 'http://localhost:5100/dtr-auth/user-lists/' + id,
      type: 'GET',
      data: {},
      dataType: 'json',
      success: function(data){
        THIS.setState({userDetailsEmail: data.email})
        THIS.setState({userDetailsFullName: data.first_name + ' ' + data.last_name})
        THIS.setState({userDetailsPosition: data.position})
        THIS.setState({userDetailsAvatar: data.avatar})
        THIS.setState({userDetailsUsername: data.username})
        $("#defaultViewText").addClass('hidden');
        $("#userDetails").removeClass('hidden');
      //  THIS.setState({userList: data})
      },
      error: function(err){
      }
    });
  }

	render() {
    var THIS = this;
    var renderData = (
      typeof this.state.userList.data == 'undefined' ? '' : this.state.userList.data.map(function(list) {
        //console.log(list.username)
        return (
          <tr>
            <td>{list.username}</td>
            <td>{list.first_name} {list.last_name}</td>
            <td>{list.email}</td>
            <td><button className = "btn btn-info" onClick = { () => THIS.viewUserData(list._id) }><span className = "glyphicon glyphicon-eye-open"></span> View</button> </td>
          </tr>
        )
      })
    )
    if (localStorage.getItem("dtrCurrentUser") === null) {
      window.location = "http://localhost:5000/#/";
    }else{
      console.log("DATA FROM STATE--> " + JSON.stringify(this.state.userList.data))
      var currentUser = JSON.parse(localStorage.getItem("dtrCurrentUser"));
      return (
  			<div id="">
        <UserHeader currentUser = {currentUser}/>
        <div className = "col-md-1"></div>
        <div className = "col-md-7">
          <div className="panel panel-info">
            <div className="panel-heading">
              <h3 className="panel-title text-primary"><span className = "glyphicon glyphicon-list"></span> User List</h3>
            </div>
            <div className="panel-body">
              <table className="table table-striped table-hover ">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {renderData}
                </tbody>
              </table>

            </div>
          </div>
        </div>

        <div className = "col-md-3">
          <div className="alert alert-dismissible alert-success">
            <p id = "defaultViewText">Click view button to show user details</p>
            <div id = "userDetails" className = "hidden">
              <p> <center><img src = {THIS.state.userDetailsAvatar} className = "img-responsive"/></center>   </p>
              <p>Name: {THIS.state.userDetailsFullName}</p>
              <p>Username: {THIS.state.userDetailsUsername}</p>
              <p>Email: {THIS.state.userDetailsEmail}</p>
              <p>Position: {THIS.state.userDetailsPosition}</p>
            </div>
          </div>
        </div>
        <div className = "col-md-1"></div>



        <Modal currentUser = {currentUser}/>
  			</div>
  		);
    }
	}



};

module.exports = UserLists;
