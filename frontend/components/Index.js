import React from 'react'
import Dashboard from './Dashboard';
// var Speaker = React.createClass({ //NATIVE REACT NO ES6
class Speaker extends React.Component {

	constructor () {
		super()
	  this.state = {
	  	username: '',
	  	password: ''
	   }

	}

	componentDidMount(){

	}



	render() {
		if (localStorage.getItem("dtrCurrentUser") === null) {
			return (
				<div className = "container">
					<div className = "row">
					<div className = "col-md-3"></div>

						<div className = "col-md-6">
							<div className="panel panel-primary">
								<div className="panel-heading">
									<h3 className="panel-title"><span className = "glyphicon glyphicon-time"></span><span id = 'displaytime'></span> Date Time Record</h3>
								</div>
								<div className="panel-body">
								<center><img src = "./assets/img/logo.png" className = "img-responsive"/></center>
									<form action = "javascript:void(0)">
										<div className = "form-group">
											<h5>Username:</h5>
											<input type = "text" name = "Username" className = "form-control" value = {this.state.username} onChange = { (e) => this.handleUsername(e) }/>
											<h5>Password:</h5>
											<input type = "password" name = "password" className = "form-control" value = {this.state.password} onChange = { (e) => this.handlePassword(e) }/>
											<br/>
											<center>
												<button className = "btn btn-lg btn-primary" onClick = { () => this.loginProcess(this.state.username, this.state.password) }>Login</button> &nbsp;
												<button className = "btn btn-lg btn-warning" onClick = { () => this.clearText() }>Clear</button>
											</center>
										</div>
									</form>
								</div>
							</div>
						</div>

						<div className = "col-md-3"></div>

					</div>
				</div>
			);
    }else{
			return (<Dashboard/>);
		}
	}

	handleUsername(e){
		this.setState({username: e.target.value});
	}
	handlePassword(e){
		this.setState({password: e.target.value});
	}
	loginProcess(username, password){

		$.ajax({
			url: 'http://localhost:5100/dtr-auth/login',
			type: 'POST',
			data: {username: username, password: password},
			dataType: 'json',
			success: function(data){
				console.log("DATA--> " + JSON.stringify(data))
				reset();
				if(data.message == "success"){
					alertify.success("Successfully Login! ", 0);
					localStorage.setItem('dtrCurrentUser', JSON.stringify(data));
					setTimeout(function(){
						window.location = "http://localhost:5000/#/dashboard";
					}, 2500);
				}else{
					alertify.error("Failed to login, Please Try Again", 0);
				}
			},
			error: function(err){

			}
		});
	}
	clearText(){
		this.setState({username: ''});
		this.setState({password: ''});
	}
}

module.exports = Speaker;
