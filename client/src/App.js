import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import { Button, Layout } from "antd";
import "./App.css";

import Login from "./pages/Login";
import Nav from "./pages/Navigator";
import Error404 from "./pages/Error404";
import Homepage from "./pages/Homepage";
import routes from "./routing";

const Homepage1 = () => {
	return (
		<div>
			<Link to="/login">
				<Button type="primary" size="large">
					Login
				</Button>
			</Link>
			<Link to="/Homepage">Homepage</Link>
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

	componentDidMount() {
		console.log("App.js is mounted");
	}

	render() {
		return (
			<Router>
				<div>
					<Nav />
					<Switch>
						{/* <Route path="/Homepage" component={Homepage} />
						<Route path="/login" component={Login} />
						<Route exact path="/" component={Homepage} />
						<Route component={Error404} /> */}
						{routes.map(route => (
							<Route path={route.path} component={route.component} />
						))}
						<Route path="/" exact component={routes[0].component} />
						<Route component={routes[1].component} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
