import React from "react";
import ReactDom from "react-dom";
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
	componentDidMount() {
		this.getData();
	}

	getData = () => {
		fetch("/getData")
			.then(res => res.json())
			.then(newData => {
				this.setState({ data: newData });
				console.log("The new data is: " + newData);
			})
			.catch(e => {
				console.log(e);
			});
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log("Received values of form: ", values);
			}
		});
	};

	render() {
		let { data } = this.state;

		const { getFieldDecorator } = this.props.form;

		return (
			<Layout className="layout" style={{ minHeight: "100vh" }}>
				<Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
					<Menu
						theme="dark"
						mode="horizontal"
						defaultSelectedKeys={["2"]}
						style={{ lineHeight: "64px" }}
					>
						<Menu.Item key="1">Brand Name</Menu.Item>
					</Menu>
				</Header>

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
							style={{ padding: "60px", backgroundColor: "#ffffff", borderRadius: "15px" }}
						>
							<Form onSubmit={this.handleSubmit} className="login-form">
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
									Or <a href="">register now!</a>
								</Form.Item>
							</Form>
						</Col>
					</Row>
				</Content>
				<Footer style={{ textAlign: "center" }}>
					This project is created by Allen and Abbas
				</Footer>
			</Layout>
		);
	}
}

// export default App;

const WrappedLogin = Form.create()(App);
ReactDom.render(<WrappedLogin />, document.getElementById("root"));

export default WrappedLogin;
