import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import { Button, Layout } from "antd";
import "./App.css";

import WrappedLogin from "./pages/Login";
import Nav from "./pages/Navigator";
import Error404 from "./pages/Error404"

const Homepage = () => {
	return (
		<Link to="/login">
			<Button type="primary" size="large">
				Login
			</Button>
		</Link>
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
						<Route exact path="/" component={Homepage} />
						<Route path="/login" component={WrappedLogin} />
						<Route component={Error404} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
