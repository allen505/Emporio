import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import routes from "./routes";
import WrappedRegistrationForm from "./Register"

import {
	Icon,
	Typography,
	Layout,
	Form,
	Input,
	Button,
	Row,
	Col,
	message
} from "antd";
import "./Login.css";

const { Title } = Typography;
const { Header, Content, Footer } = Layout;

// Fetch the data on first mount

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: "Nothing recieved"
		};
	}

	success = () => {
		message.success("Logged In Successfully");
	};

	error = () => {
		message.error("Log in unsuccessful");
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				// console.log("Received values of form: ", values);
				let enteredDets = {
					username: values.username,
					password: values.password
				};
				var validate = () => {
					fetch("/api/login", {
						method: "POST",
						headers: {
							"Content-Type": "application/json;charset=utf-8"
						},
						body: JSON.stringify(enteredDets)
					})
						.then(res => res.json())
						.then(resp => {
							if (resp == true) {
								this.success();
							} else {
								this.error();
							}
						});
				};
				validate();
			}
		});
	};

	render() {
		let { data } = this.state;

		const { getFieldDecorator } = this.props.form;

		return (
			<Router forceRefresh={true}>
				<Layout className="layout" style={{ minHeight: "100vh" }}>
					<Content
						style={{
							padding: "75px 50px",
							marginTop: 64,
							textAlign: "center"
						}}
					>
						<Row type="flex" align="center">
							<Col
								span={8}
								style={{
									padding: "60px",
									backgroundColor: "#ffffff",
									borderRadius: "15px"
								}}
							>
								<Form
									onSubmit={this.handleSubmit}
									className="login-form"
								>
									<Form.Item>
										{getFieldDecorator("username", {
											rules: [
												{
													required: true,
													message: "Please input your username!"
												}
											]
										})(
											<Input
												prefix={
													<Icon
														type="user"
														style={{ color: "rgba(0,0,0,.25)" }}
													/>
												}
												placeholder="Username"
											/>
										)}
									</Form.Item>
									<Form.Item>
										{getFieldDecorator("password", {
											rules: [
												{
													required: true,
													message: "Please input your Password!"
												}
											]
										})(
											<Input
												prefix={
													<Icon
														type="lock"
														style={{ color: "rgba(0,0,0,.25)" }}
													/>
												}
												type="password"
												placeholder="Password"
											/>
										)}
									</Form.Item>
									<Form.Item>
										<Button
											type="primary"
											htmlType="submit"
											className="login-form-button"
										>
											Log in
										</Button>
										<br />
										Or <a href="">Register now!</a>
									</Form.Item>
								</Form>
							</Col>
						</Row>
						<li>
							<Link to="/homepage">Go home</Link>
						</li>
					</Content>
					<Footer style={{ textAlign: "center" }}>
						This project is created by Allen and Abbas
					</Footer>
					<WrappedRegistrationForm/>
				</Layout>
				<Switch>
					{routes.map(route => (
						<Route
							key={route.path}
							exact
							path={route.path}
							component={route.component}
						/>
					))}
				</Switch>
				{/* <Route exact path={routes[0].path} component={routes[0].component} /> */}
			</Router>
		);
	}
}

// export default Login;

Login = Form.create()(Login);
// ReactDom.render(<WrappedLogin />, document.getElementById("root"));

export default Login;
