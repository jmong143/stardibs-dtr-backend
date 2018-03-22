import React from 'react';
import UserHeader from './parts/UserHeader';
import Modal from './parts/Modal';

class ViewRecord extends React.Component{
  constructor () {
    super()
    this.state = {
      renderDTRData: []
     }
  }
  componentDidMount(){
    this.retrieveUserDTR();
  }

  retrieveUserDTR(){
    var THIS = this;
    var currentUser = JSON.parse(localStorage.getItem("dtrCurrentUser"));
    $.ajax({
      url: 'http://localhost:5008/dtr-api/time-record/basic-search',
      type: 'POST',
      data: {userId: currentUser['user']._id},
      dataType: 'json',
      success: function(data){

        THIS.setState({renderDTRData: data})
      },
      error: function(err){
      }
    });
  }

	render() {
    var THIS = this;
    console.log("DATA--> " + JSON.stringify(THIS.state.renderDTRData.data))

    var renderDTRData = (
      typeof this.state.renderDTRData.data == 'undefined'  ? '' : this.state.renderDTRData.data.map(function(list) {
        return (
          <tr>
            <td>{list.dateIn}</td>
            <td>{moment(list.timeIn,'h:mm a').format('h:mm a')}</td>
            <td>{list.timeOut == "--" ? '--' : moment(list.timeOut,'h:mm a').format('h:mm a')}</td>
            <td>{list.totalHours}</td>
            <td>{list.status}</td>
          </tr>
        )
      })
    )

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
              <h3 className="panel-title text-primary"><span className = "glyphicon glyphicon-list"></span> DTR Record</h3>
            </div>
            <div className="panel-body">

              <table className="table table-striped table-hover ">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time In</th>
                    <th>Time Out</th>
                    <th>Total Hours</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {renderDTRData}
                </tbody>
              </table>


            </div>
          </div>
        </div>
        <div className = "col-md-2"></div>
        <Modal currentUser = {currentUser}/>
  			</div>
  		);
    }
	}




};

module.exports = ViewRecord;
