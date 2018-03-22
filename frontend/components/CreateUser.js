import React from 'react';
import UserHeader from './parts/UserHeader';
import Modal from './parts/Modal';

class CreateUser extends React.Component{
  constructor () {
    super()
    this.state = {
      txtUsername: '',
      txtFirstName: '',
      txtLastName: '',
      txtEmail: '',
      txtPassword: '',
      txtPosition: ''
     }
  }
  componentDidMount(){
  }

	render() {
    var THIS = this;
    if (localStorage.getItem("dtrCurrentUser") === null) {
      window.location = "http://localhost:5000/#/";
    }else{
      var currentUser = JSON.parse(localStorage.getItem("dtrCurrentUser"));
      return (
  			<div id="">
        <UserHeader currentUser = {currentUser}/>
        <div className = "col-md-2"></div>
        <div className = "col-md-7">
          <div className="panel panel-info">
            <div className="panel-heading">
              <h3 className="panel-title text-primary"><span className = "glyphicon glyphicon-plus"></span> Create User</h3>
            </div>
            <div className="panel-body">
              <form action = "javascript:void(0)" onSubmit = { () => this.createUserProcess()}>
                <div className = "form-group col-md-6">
                  <strong>Username: </strong>
                  <input type = "text" className = "form-control" placeholder = "Input Username" name = "username" value = {this.state.txtUsername} onChange = { (e) => this.handleUsername(e) }/>
                </div>

                <div className = "form-group col-md-6">
                  <strong>Password: </strong>
                  <input type = "password" className = "form-control" placeholder = "Input Password" name = "password" value = {this.state.txtPassword} onChange = { (e) => this.handlePassword(e) }/>
                </div>

                <div className = "form-group col-md-6">
                  <strong>First Name: </strong>
                  <input type = "text" className = "form-control" placeholder = "Input First Name" name = "first_name" value = {this.state.txtFirstName} onChange = { (e) => this.handleFirstName(e) }/>
                </div>

                <div className = "form-group col-md-6">
                  <strong>Last Name: </strong>
                  <input type = "text" className = "form-control" placeholder = "Input Last Name" name = "last_name" value = {this.state.txtLastName} onChange = { (e) => this.handleLastName(e) }/>
                </div>

                <div className = "form-group col-md-6">
                  <strong>Email: </strong>
                  <input type = "text" className = "form-control" placeholder = "Input Email" name = "email" value = {this.state.txtEmail} onChange = { (e) => this.handleEmail(e) }/>
                </div>

                <div className = "form-group col-md-6">
                  <strong>Position: </strong>
                  <select className = "form-control" name = "position" value = {this.state.txtPosition} onChange = { (e) => this.handlePosition(e) }>
                    <option></option>
                    <option>Team Leader</option>
                    <option>Project Manager</option>
                    <option>Web Developer</option>
                    <option>Human Resources</option>
                    <option>Finance</option>
                    <option>Business Developer</option>
                    <option>SEO</option>
                  </select>
                </div>
                <center>
                  <button className = "btn btn-primary" type = "submit"> Submit</button> &nbsp;
                  <button className = "btn btn-default" onClick = { () => this.clearTextbox() }> Clear</button>
                </center>
              </form>
            </div>
          </div>
        </div>
        <div className = "col-md-2"></div>
        <Modal currentUser = {currentUser}/>
  			</div>
  		);
    }
	}


  handleUsername(e){
    this.setState({txtUsername: e.target.value});
  }
  handlePassword(e){
    this.setState({txtPassword: e.target.value});
  }
  handleFirstName(e){
    this.setState({txtFirstName: e.target.value});
  }
  handleLastName(e){
    this.setState({txtLastName: e.target.value});
  }
  handleEmail(e){
    this.setState({txtEmail: e.target.value});
  }
  handlePosition(e){
    this.setState({txtPosition: e.target.value});
  }

  clearTextbox(){
    this.setState({txtUsername: ''});
    this.setState({txtPassword: ''});
    this.setState({txtFirstName: ''});
    this.setState({txtLastName: ''});
    this.setState({txtEmail: ''});
    this.setState({txtPosition: ''});
  }


  createUserProcess(){
    var THIS = this;
    $.ajax({
      url: 'http://localhost:5100/dtr-auth/signup',
      type: 'POST',
      data: {
        username: THIS.state.txtUsername,
        password: THIS.state.txtPassword,
        email: THIS.state.txtEmail,
        position: THIS.state.txtPosition,
        first_name: THIS.state.txtFirstName,
        last_name: THIS.state.txtLastName,
        userType: 'user',
        avatar: './assets/img/avatar/' + THIS.state.txtUsername + '.jpg',
      },
      dataType: 'json',
      success: function(data){
        console.log("DATA FOR CREATE--> " + JSON.stringify(data))
        alertify.success("User Successfully Created! Check in List of Users link ", 0);
        THIS.clearTextbox();
      },
      error: function(err){
      }
    });
  }



};

module.exports = CreateUser;
