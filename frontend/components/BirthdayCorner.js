import React from 'react';
import UserHeader from './parts/UserHeader';
import Modal from './parts/Modal';

class BirthdayCorner extends React.Component{
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
              <h3 className="panel-title text-primary"><span className = "glyphicon glyphicon-list"></span> Birthday Corner</h3>
            </div>
            <div className="panel-body">

              <table className="table table-striped table-hover ">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Birthday</th>
                  </tr>
                </thead>
                <tbody>

                  <tr className="info">
                    <td>1</td>
                    <td>John Michael Ong</td>
                    <td>March 7, 1995</td>
                  </tr>
                  <tr className="success">
                    <td>2</td>
                    <td>John Rey Iguin</td>
                    <td>Jun 23, 1995</td>
                  </tr>
                  <tr className="danger">
                    <td>3</td>
                    <td>John Paul Grabador</td>
                    <td>December 27, 1994</td>
                  </tr>
                  <tr className="warning">
                    <td>4</td>
                    <td>Lianne</td>
                    <td>--</td>
                  </tr>
                  <tr className="active">
                    <td>5</td>
                    <td>Maribel Bonrostro</td>
                    <td>November 10, 1994</td>
                  </tr>
                  <tr className="danger">
                    <td>6</td>
                    <td>Sherry Mae Manuel</td>
                    <td>December 1, 1995</td>
                  </tr>
                  <tr className="success">
                    <td>7</td>
                    <td>Marvin Centeno</td>
                    <td>September 16, 1992</td>
                  </tr>
                  <tr className="info">
                    <td>8</td>
                    <td>Jeramie Joy Alayon</td>
                    <td>September 7, 1995</td>
                  </tr>
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

module.exports = BirthdayCorner;
