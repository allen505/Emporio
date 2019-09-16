import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import { Button, Layout } from "antd";
import "./App.css";

import WrappedLogin from "./pages/Login";
import Nav from "./pages/Navigator";
import Error404 from "./pages/Error404";
import Homepage from "./pages/Homepage"

const Homepage1 = () => {
	return (
		<div>
		<Link to="/login">
			<Button type="primary" size="large">
				Login
			</Button>
		</Link>
		<Link to = "/Homepage">Homepage</Link>
		</div>
	);
};

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: "Nothing recieved"
		};
	}

	render() {
		return (
			<Router>
				<div>
					<Nav />
					<Switch>
						<Route path="/Homepage" component={Homepage} />
						<Route path="/login" component={WrappedLogin} />
						<Route path="/" component={Homepage1} />
						<Route component={Error404} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
