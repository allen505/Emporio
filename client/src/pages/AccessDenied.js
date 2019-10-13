import React from "react";
import { BrowserRouter as Link } from "react-router-dom";

import stopSign from "../Images/stopSign.png";

class AccessDenied extends React.Component {
	constructor(props) {
		super(props);
		this.myRef = React.createRef();
	}

	render() {
		
		return (
			<div id="main">
				
				<img id="image" src={stopSign} alt="STOP" height="120px" width="120px" />
				<br />
				<p>You are not allowed to enter here</p>
				<p>The server understood your request but declined access.</p>
			</div>
		);
	}
}
export default AccessDenied;
