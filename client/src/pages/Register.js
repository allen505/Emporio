import {
	Form,
	Tooltip,
	Icon,
	Input,
	Select,
	Row,
	Col,
	Radio,
	Button,
	Typography,
	Layout,
	message,
	InputNumber
} from "antd";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Redirect } from "react-router";

import React from "react";

const { Title } = Typography;
const { Header, Content, Footer } = Layout;

const { Option } = Select;

class RegistrationForm extends React.Component {
	state = {
		confirmDirty: false,
		radioState: "buyer"
	};

	success = () => {
		message.success("Registration Successful");
		this.props.history.push("/login", { some: "state" });
	};

	error = () => {
		message.error("Registration unsuccessful");
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				values.accType = this.state.radioState;
				delete values["confirm"];
				let register = () => {
					fetch("/api/register", {
						method: "POST",
						headers: {
							"Content-Type": "application/json;charset=utf-8"
						},
						body: JSON.stringify(values)
					})
						.then(res => res.json())
						.then(resp => {
							// console.log(resp.status);
							if (resp == true) {
								this.success();
							} else {
								this.error();
							}
						});
				};
				register();
			}
		});
	};

	radioChange = selected => {
		this.setState({
			radioState: selected.target.value
		});
	};

	handleConfirmBlur = e => {
		const { value } = e.target;
		this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	};

	compareToFirstPassword = (rule, value, callback) => {
		const { form } = this.props;
		if (value && value !== form.getFieldValue("password")) {
			callback("Two passwords that you enter is inconsistent!");
		} else {
			callback();
		}
	};

	validateToNextPassword = (rule, value, callback) => {
		const { form } = this.props;
		if (value && this.state.confirmDirty) {
			form.validateFields(["confirm"], { force: true });
		}
		callback();
	};

	extraFields = () => {
		const { getFieldDecorator } = this.props.form;

		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 8 }
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 16 }
			}
		};

		if (this.state.radioState == "buyer") {
			return (
				<div>
					<Form.Item {...formItemLayout} label="City">
						{getFieldDecorator("city", {
							rules: [
								{
									required: true,
									message: "City"
								}
							]
						})(<Input />)}
					</Form.Item>
					<Form.Item {...formItemLayout} label="State">
						{getFieldDecorator("state", {
							rules: [
								{
									required: true,
									message: "State"
								}
							]
						})(<Input />)}
					</Form.Item>
				</div>
			);
		} else if (this.state.radioState == "seller") {
			return (
				<Form.Item label="Phone Number">
					{getFieldDecorator("phone", {
						rules: [
							{
								required: true,
								message: "Please input your phone number!"
							}
						]
					})(<InputNumber style={{ width: "100%" }} />)}
				</Form.Item>
			);
		}
	};

	render() {
		const { getFieldDecorator } = this.props.form;

		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 8 }
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 16 }
			}
		};

		const prefixSelector = getFieldDecorator("prefix", {
			initialValue: "91"
		})(
			<Select style={{ width: 70 }}>
				<Option value="91">+91</Option>
				<Option value="1">+1</Option>
			</Select>
		);

		return (
			<Layout className="layout" style={{ minHeight: "100vh" }}>
				<Content
					style={{
						padding: "75px 50px",
						marginTop: 64,
						textAlign: "center"
					}}
				>
					<Title>Register</Title>
					<Row type="flex" align="center">
						<Col
							span={10}
							style={{
								padding: "60px",
								backgroundColor: "#ffffff",
								borderRadius: "15px"
							}}
						>
							<Form {...formItemLayout} onSubmit={this.handleSubmit}>
								<Radio.Group
									defaultValue="buyer"
									buttonStyle="solid"
									style={{ margin: "15px" }}
									onChange={this.radioChange}
								>
									<Radio.Button value="buyer">Buyer</Radio.Button>
									<Radio.Button value="seller">Seller</Radio.Button>
								</Radio.Group>
								<Form.Item
									label={
										<span>
											User ID&nbsp;
											<Tooltip title="This will be used for login">
												<Icon type="question-circle-o" />
											</Tooltip>
										</span>
									}
								>
									{" "}
									{getFieldDecorator("userid", {
										rules: [
											{
												required: true,
												message: "Please input your User ID!",
												whitespace: true
											}
										]
									})(
										<InputNumber placeholder="Do not forget your User ID!" style={{width:"100%"}} />
									)}
								</Form.Item>
								<Form.Item {...formItemLayout} label="Name">
									{getFieldDecorator("name", {
										rules: [
											{
												required: true,
												message: "Please input your name"
											}
										]
									})(<Input placeholder="Please input your name" />)}
								</Form.Item>
								<Form.Item label="Password" hasFeedback>
									{getFieldDecorator("password", {
										rules: [
											{
												required: true,
												message: "Please input your password!"
											},
											{
												validator: this.validateToNextPassword
											}
										]
									})(
										<Input.Password placeholder="Do not forget your password either!" />
									)}
								</Form.Item>
								<Form.Item label="Confirm Password" hasFeedback>
									{getFieldDecorator("confirm", {
										rules: [
											{
												required: true,
												message: "Please confirm your password!"
											},
											{
												validator: this.compareToFirstPassword
											}
										]
									})(
										<Input.Password
											onBlur={this.handleConfirmBlur}
											placeholder="Repeat password"
										/>
									)}
								</Form.Item>
								<this.extraFields />
								<Button type="primary" htmlType="submit">
									Register
								</Button>
							</Form>
						</Col>
					</Row>
					<Link to="/homepage">
						<Button type="link" size="large">
							Go Home
						</Button>
					</Link>
				</Content>
				<Footer style={{ textAlign: "center" }}>
					This project is created by Allen and Abbas
				</Footer>
			</Layout>
		);
	}
}

RegistrationForm = Form.create({ name: "register" })(RegistrationForm);

export default RegistrationForm;
