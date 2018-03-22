import React from 'react'

class Modal extends React.Component{
	constructor () {
		super()
		this.state = {
			txtNewPass: '',
			txtFirstName: '',
			txtLastName: '',
			txtEmail: ''
		 }
	}
	componentDidMount(){
		const currentUser = JSON.parse(localStorage.getItem("dtrCurrentUser"));
		this.setState({txtFirstName: currentUser['user'].first_name});
		this.setState({txtLastName: currentUser['user'].last_name});
		this.setState({txtEmail: currentUser['user'].email});
	}


	render() {
		return (
      <div>
			<div id="modalLogout" className="modal fade" role="dialog">
				<div className="modal-dialog">

					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal">&times;</button>
							<h4 className="modal-title"><b>Are you sure you want to logout?</b></h4>
						</div>
						<div className="modal-body">
							<p> <center><img src = "./assets/img/logout.gif" className = "img-responsive"/></center>   </p>
						</div>
						<div className="modal-footer">
							<button type="button" onClick = { () => this.logoutProcess() } className="btn btn-primary"> <span className = "glyphicon glyphicon-ok"></span> Yes</button>
							<button type="button" id = "btnTimeInCancel" className="btn btn-warning" data-dismiss="modal"><span className = "glyphicon glyphicon-ban-circle"></span> No</button>
						</div>
					</div>

				</div>
			</div>


			<div id="modalChangePassword" className="modal fade" role="dialog">
				<div className="modal-dialog">

					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal">&times;</button>
							<h4 className="modal-title"><b>Change Password</b></h4>
						</div>
						<div className="modal-body">
							<form action = "javascript:void(0)" onSubmit = { () => this.updatePassword() }>
								<div className = "form-group">
									<h5>Input Your New Password</h5>
									<input type = "text" className = "form-control" placeholder = "New Password" onChange = { (e) => this.handleNewPass(e) }/>
								</div>
								<button className = "btn btn-success" type = "submit">Update Password</button>
							</form>
						</div>
						<div className="modal-footer">
							<button type="button" id = "btnTimeInCancel" className="btn btn-warning" data-dismiss="modal"><span className = "glyphicon glyphicon-ban-circle"></span> Cancel</button>
						</div>
					</div>

				</div>
			</div>


			<div id="modalEditProfile" className="modal fade" role="dialog">
				<div className="modal-dialog">

					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal">&times;</button>
							<h4 className="modal-title"><b>Update Profile</b></h4>
						</div>
						<div className="modal-body">
							<form action = "javascript:void(0)" onSubmit = { () => this.updateProfile() }>
								<div className = "form-group">
									<h5>First Name</h5>
									<input type = "text" className = "form-control" placeholder = "First Name" value = {this.state.txtFirstName} onChange = { (e) => this.handleFirstName(e) }/>
								</div>
								<div className = "form-group">
									<h5>Last Name</h5>
									<input type = "text" className = "form-control" placeholder = "Last Name" value = {this.state.txtLastName} onChange = { (e) => this.handleLastName(e) }/>
								</div>
								<div className = "form-group">
									<h5>Email</h5>
									<input type = "text" className = "form-control" placeholder = "Email" value = {this.state.txtEmail} onChange = { (e) => this.handleEmail(e) }/>
								</div>
								<button className = "btn btn-success" type = "submit">Update Profile</button>
							</form>
						</div>
						<div className="modal-footer">
							<button type="button" id = "btnTimeInCancel" className="btn btn-warning" data-dismiss="modal"><span className = "glyphicon glyphicon-ban-circle"></span> Cancel</button>
						</div>
					</div>

				</div>
			</div>



      <div id="modalTimeIn" className="modal fade" role="dialog">
        <div className="modal-dialog">

          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h4 className="modal-title"><b>Time In</b></h4>
            </div>
            <div className="modal-body">
              <p> <center><img src = "./assets/img/work-in.gif" className = "img-responsive"/></center>   </p>
            </div>
            <div className="modal-footer">
              <button type="button" onClick = { () => this.timeInProcess() } className="btn btn-primary"> <span className = "glyphicon glyphicon-ok"></span> Yes</button>
              <button type="button" id = "btnTimeInCancel" className="btn btn-warning" data-dismiss="modal"><span className = "glyphicon glyphicon-ban-circle"></span> No</button>
            </div>
          </div>

        </div>
      </div>



      <div id="modalTimeOut" className="modal fade" role="dialog">
        <div className="modal-dialog">

          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h4 className="modal-title"><b>Time Out</b></h4>
            </div>
            <div className="modal-body">
              <p> <center><img src = "./assets/img/work-out.gif" className = "img-responsive"/></center>   </p>
            </div>
            <div className="modal-footer">
						<button type="button" onClick = { () => this.timeOutProcess() } className="btn btn-primary"> <span className = "glyphicon glyphicon-ok"></span> Yes</button>
						<button type="button" id = "btnTimeOutCancel" className="btn btn-warning" data-dismiss="modal"><span className = "glyphicon glyphicon-ban-circle"></span> No</button>
            </div>
          </div>

        </div>
      </div>
      </div>
		);
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

	updateProfile(){
		var THIS = this;

		const currentUser = JSON.parse(localStorage.getItem("dtrCurrentUser"));
		var id = currentUser['user']._id;
		if(THIS.state.txtEmail == "" || THIS.state.txtLastName == "" || THIS.state.txtFirstName == ""){
			alertify.error("Please complete all fields", 0);

		}else{
			$.ajax({
				url: 'http://localhost:5100/dtr-auth/update-profile/',
				type: 'POST',
				data: {first_name: THIS.state.txtFirstName, last_name: THIS.state.txtLastName, email: THIS.state.txtEmail, currentObjectId: currentUser['user']._id},
				dataType: 'json',
				success: function(result){
					console.log("DATA--> " + JSON.stringify(result))
					if(result.message == "success"){
						alertify.success("Profile Successfully Updated! Please Login Again  ", 0);
						localStorage.removeItem('dtrCurrentUser');
						$("#modalEditProfile").modal('hide');
						window.location = "http://localhost:5000/#/";
					}else{
						alertify.error(result.resultMessage, 0);
					}
				},
				error: function(err){
				}
			});
		}
	}

	handleNewPass(e){
		this.setState({txtNewPass: e.target.value});
	}
	updatePassword(){
		var THIS = this;
		if (this.state.txtNewPass == ""){
			alertify.error("Please complete all fields", 0);
		}else{
			const currentUser = JSON.parse(localStorage.getItem("dtrCurrentUser"));
			var id = currentUser['user']._id;
			$.ajax({
				url: 'http://localhost:5100/dtr-auth/update-password/' + id,
				type: 'POST',
				data: {password: THIS.state.txtNewPass},
				dataType: 'json',
				success: function(result){
					console.log("DATA--> " + JSON.stringify(result))
					$("#modalChangePassword").modal('hide');
						alertify.success("Password Successfully Changed! Please Login Again ", 0);
						localStorage.removeItem('dtrCurrentUser');
						window.location = "http://localhost:5000/#/";
				},
				error: function(err){
				}
			});
		}



	}

	logoutProcess(){
		localStorage.removeItem('dtrCurrentUser');
		$("#modalLogout").modal('hide');
		alertify.success('Successfully Log Out');
		window.location = "http://localhost:5000/#/";

	}

	timeInProcess(){
		var currentUser = this.props.currentUser;
		var currentdate = new Date();
    var timeIn = currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();
		var getDate = moment().format('LL')
		$.ajax({
			url: 'http://localhost:5008/dtr-api/time-record',
			type: 'POST',
			data: {userId: currentUser['user']._id, timeIn: timeIn, dateIn: getDate, status: 'IN'},
			dataType: 'json',
			success: function(result){
				console.log("DATA--> " + JSON.stringify(result))
				if(result.message == "failed" ){
					alertify.error("Failed to time in, please TIME OUT first ", 0);
					$("#btnTimeInCancel").click();
				}else{
					reset();
					alertify.success("Successfully Time In! ", 0);
					$("#btnTimeInCancel").click();

				}
			},
			error: function(err){
			}
		});
	}
	timeOutProcess(){
		var currentUser = this.props.currentUser;
		var currentdate = new Date();
    var timeOut = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
		var getDate = moment().format('LL');

		var totalHours = "";
		$.ajax({
			url: 'http://localhost:5008/dtr-api/time-record/out',
			type: 'POST',
			data: {userId: currentUser['user']._id, totalHours: totalHours, timeOut: timeOut, dateOut: getDate, status: 'OUT'},
			dataType: 'json',
			success: function(result){
				console.log("DATA--> " + JSON.stringify(result))
				if(result.message == "failed" ){
					alertify.error("Failed to time out, please TIME IN first ", 0);
					$("#btnTimeOutCancel").click();
				}else{
					reset();
					alertify.success("Successfully Time Out! <br/> Total Hours: <b>"+ result.data.totalHours +"</b> ", 0);
					$("#btnTimeOutCancel").click();
				}
				/*reset();
				alertify.success("Successfully Time Out! Total Hours:  ", 0);
				$("#btnTimeOutCancel").click();*/
			},
			error: function(err){
			}
		});

	}
}


module.exports = Modal;
