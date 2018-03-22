import React from 'react';
import UserHeader from './parts/UserHeader';
import Modal from './parts/Modal';

class ManualDTR extends React.Component{
  constructor () {
    super()
    this.state = {
      checkTimeInStatus: [],
      timeInCurrentDate: '',
      timeInCurrentIn: '',
      timeInCurrentId: '',
      txtManualTimeOut: '',

      txtTimeOutDate: '',
      txtTimeOutFirst: '',
      txtTimeOutSecond: '',
     }
  }

  componentDidMount(){
    this.checkTimeInStatus()
  }

  checkTimeInStatus(){
    var THIS = this;
    var currentUser = JSON.parse(localStorage.getItem("dtrCurrentUser"));
    $.ajax({
      url: 'http://localhost:5008/dtr-api/time-record/basic-search',
      type: 'POST',
      data: {userId: currentUser['user']._id, status: "IN"},
      dataType: 'json',
      success: function(results){
        console.log("DATA FROM STATUS IN--> " + JSON.stringify(results.data))
        if(results.data.length > 0){
          THIS.setState({timeInCurrentDate: results.data[0].dateIn})
          THIS.setState({timeInCurrentIn: results.data[0].timeIn})
          THIS.setState({timeInCurrentId: results.data[0]._id})
        }
        THIS.setState({checkTimeInStatus: results.data})
      },
      error: function(err){
      }
    });
  }
  handleManualTimeOut(e){
    this.setState({txtManualTimeOut: e.target.value});
  }
  submitManualTimeOut(){
    var THIS = this;
    var id = this.state.timeInCurrentId;
    var currentUser = JSON.parse(localStorage.getItem("dtrCurrentUser"));

    var startTime=moment(THIS.state.timeInCurrentIn,'h:mm a').format('h:mm a');
    var endTime=moment(THIS.state.txtManualTimeOut,'h:mm a').format('h:mm a');

    console.log("START TIME-- > " + startTime)
    console.log("END TIME-- > " + endTime)
    $.ajax({
      url: 'http://localhost:5008/dtr-api/time-record/manual-time-out/' + id,
      type: 'POST',
      data: {status: "OUT", timeOut: endTime, timeIn: startTime, dateOut: THIS.state.timeInCurrentDate},
      dataType: 'json',
      success: function(results){
        alertify.success(results.resultMessage + "<br/>Total Hours: " + results.data['totalHours']);
        console.log("DATA FROM MANUAL TIME IN--> " + JSON.stringify(results))
        setTimeout(function(){
          window.location = "http://localhost:5000/#/dashboard";
        }, 2000);
      },
      error: function(err){
      }
    });

  }
	render() {
    var renderTimeOutFields = (
      <div className="alert alert-dismissible alert-danger">
        <form action = "javascript:void(0)" onSubmit = { () => this.submitManualTimeOut()}>
          <div className = "form-group">
            <strong>Current Date</strong>
            <input type = "text" placeholder = "Current Date" className = "form-control" value = {this.state.timeInCurrentDate} disabled/>
          </div>
          <div className = "form-group">
            <strong>Current Time In</strong>
            <input type = "text" placeholder = "Current Date" className = "form-control" value = {moment(this.state.timeInCurrentIn,'h:mm a').format('h:mm a')} disabled/>
          </div>

          <div className = "form-group">
            <strong>Input Time Out</strong>
            <input type = "time" placeholder = "Input Time Out" name = "txtManualTimeOut" value = {this.state.txtManualTimeOut} onChange = { (e) => this.handleManualTimeOut(e)} className = "form-control"/>
          </div>

          <button className = "btn btn-success" type = "submit">Time Out</button>
        </form>
      </div>
    )
    if (localStorage.getItem("dtrCurrentUser") === null) {
      window.location = "http://localhost:5000/#/";
    }else{
      var currentUser = JSON.parse(localStorage.getItem("dtrCurrentUser"));
      return (
  			<div id="">
        <UserHeader currentUser = {currentUser}/>
        <div className = "col-md-2"></div>
        <div className = "col-md-8">
          <div className="panel panel-info">
            <div className="panel-heading">
              <h3 className="panel-title text-primary"><span className = "glyphicon glyphicon-time"></span> Manual Time In/ Time Out</h3>
            </div>
            <div className="panel-body">
              <ul className="nav nav-tabs">
                <li><a href="#timeIn" data-toggle="tab" aria-expanded="true">Time In</a></li>
                <li><a href="#timeOut" data-toggle="tab" aria-expanded="false">Time Out</a></li>
                </ul>
                <div id="myTabContent" className="tab-content">
                <div className="tab-pane fade active in" id="timeIn">
                  <br/>
                  <div className="alert alert-dismissible alert-danger">
                    <form action = "javascript:void(0)" onSubmit = { () => this.submitManualTimeIn() }>
                      <div className = "form-group">
                        <strong>Select Date</strong>
                        <input type = "date" className = "form-control" placeholder = "Select Date" onChange = { (e) => this.handleSelectDateIn(e) }/>
                      </div>

                      <div className = "form-group">
                        <strong>Input Time In</strong>
                        <input type = "time" className = "form-control" placeholder = "Time In" onChange = { (e) => this.handleSelectTimeIn(e) }/>
                      </div>

                      <div className = "form-group">
                        <strong>Input Time Out</strong>
                        <input type = "time" className = "form-control" placeholder = "Time Out" onChange = { (e) => this.handleSelectTimeOut(e) }/>
                      </div>

                      <button className = "btn btn-success" type = "submit">Submit</button>
                    </form>
                  </div>
                </div>



                <div className="tab-pane fade" id="timeOut">
                  {typeof this.state.checkTimeInStatus == 'undefined' || this.state.checkTimeInStatus.length == [] ? <div><br/><div className="alert alert-dismissible alert-info" id = "">No Time In Record Found</div></div> : <div  id = "timeInRecord">{renderTimeOutFields}</div>}
                </div>

                </div>
            </div>
          </div>
        </div>
        <div className = "col-md-2"></div>
        <Modal currentUser = {currentUser}/>
  			</div>
  		);
    }
	}

  handleSelectDateIn(e){
    this.setState({txtTimeOutDate: e.target.value});
  }

  handleSelectTimeIn(e){
    this.setState({txtTimeOutFirst: e.target.value})
  }
  handleSelectTimeOut(e){
    this.setState({txtTimeOutSecond: e.target.value})
  }

  submitManualTimeIn(){
    var THIS = this;
    var currentUser = JSON.parse(localStorage.getItem("dtrCurrentUser"));
    var startTime=moment(THIS.state.txtTimeOutFirst,'h:mm a').format('h:mm a');
    var endTime=moment(THIS.state.txtTimeOutSecond,'h:mm a').format('h:mm a');
    var selectedDate = moment(THIS.state.txtTimeOutDate).format('LL')
    console.log("START TIME-- > " + startTime)
    console.log("END TIME-- > " + endTime)
    console.log("SELECTED DATE-- > " + selectedDate)
    $.ajax({
      url: 'http://localhost:5008/dtr-api/time-record/manual-time-in',
      type: 'POST',
      data: {status: "OUT", timeOut: endTime, timeIn: startTime, dateOut: selectedDate, dateIn: selectedDate, userId: currentUser['user']._id},
      dataType: 'json',
      success: function(results){
        if(results.message == "success"){
          alertify.success(results.resultMessage + "<br/>Total Hours: " + results.data['totalHours']);
          setTimeout(function(){
            window.location = "http://localhost:5000/#/view-record";
          }, 2000);

        }else{
          alertify.error(results.resultMessage);
        }
        console.log("DATA FROM MANUAL TIME IN--> " + JSON.stringify(results))
      },
      error: function(err){
      }
    });
  }
};

module.exports = ManualDTR;
