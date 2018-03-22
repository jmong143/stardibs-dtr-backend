import React from 'react'

class Header extends React.Component{
	render() {
		return (
			<header className="">
				<br/>
				<img src = "./assets/img/stardibs-banner.png" className = "img-responsive"/>
				<center><img src = "./assets/img/logo.png" className = "img-responsive"/></center>
				<hr/>
			</header>
		);
	}
}


module.exports = Header;
