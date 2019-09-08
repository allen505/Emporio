import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import {
	Menu,
	Icon,
	Typography,
	Layout,
	Form,
	Input,
	Checkbox,
	Button,
	Row,
	Col
} from "antd";
import "./App.css";

import WrappedLogin from "./pages/Login";

const { Title } = Typography;
const { Header, Content, Footer } = Layout;

// Fetch the data on first mount

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
					<ul>
						<li>
							<Link to="/login">Login</Link>
						</li>
					</ul>
					<Switch>
						<Route path="/login" component={WrappedLogin} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
