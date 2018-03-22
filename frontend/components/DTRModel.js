import React from 'react';
import UserHeader from './parts/UserHeader';
import Modal from './parts/Modal';

class DTRModel extends React.Component{
  constructor () {
    super()
    this.state = {
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
              <h3 className="panel-title text-primary"><span className = "glyphicon glyphicon-list"></span> Congratulations</h3>
            </div>
            <div className="panel-body">
              <div className="alert alert-dismissible alert-success col-md-12">
                <h4>Model of the month currently empty</h4>
                <div className = "col-md-6 hidden">
                  <h3>Name: Lorem Ipsum</h3>
                  <h4>Position: Lorem Ipsum</h4>
                  <hr/>
                  <h4>Top 3 Record:</h4>
                  <ul>
                  <li><h5>Month Day, Year - Hour:Min</h5></li>
                  <li><h5>Month Day, Year - Hour:Min</h5></li>
                  <li><h5>Month Day, Year - Hour:Min</h5></li>
                  </ul>
                </div>

                <div className = "col-md-6 hidden">
                  <img src = "./assets/img/avatar/michael1.jpg" className = "img-responsive" style = {{ height:"300px"}} />
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




};

module.exports = DTRModel;
