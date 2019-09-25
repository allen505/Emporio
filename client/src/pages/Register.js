import {
	Form,
	Input,
	Tooltip,
	Icon,
	Cascader,
	Select,
	Row,
	Col,
	Checkbox,
	Radio,
	Button,
	Typography,
	Layout,
	message
} from "antd";

import React from "react";

const { Title } = Typography;
const { Header, Content, Footer } = Layout;

const { Option } = Select;

class RegistrationForm extends React.Component {
	state = {
		confirmDirty: false,
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				console.log("Received values of form: ", values);
			}
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
		const tailFormItemLayout = {
			wrapperCol: {
				xs: {
					span: 24,
					offset: 0
				},
				sm: {
					span: 16,
					offset: 8
				}
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
					<Row type="flex" align="center">
						<Col
							span={8}
							style={{
								padding: "60px",
								backgroundColor: "#ffffff",
								borderRadius: "15px"
							}}
						>
							<Form {...formItemLayout} onSubmit={this.handleSubmit}>
								<Radio.Group
									defaultValue="a"
									buttonStyle="solid"
									style={{ margin: "15px" }}
								>
									<Radio.Button value="a">Buyer</Radio.Button>
									<Radio.Button value="b">Seller</Radio.Button>
								</Radio.Group>
								<Form.Item label="E-mail">
									{getFieldDecorator("email", {
										rules: [
											{
												type: "email",
												message: "The input is not valid E-mail!"
											},
											{
												required: true,
												message: "Please input your E-mail!"
											}
										]
									})(<Input />)}
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
									})(<Input.Password />)}
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
										<Input.Password onBlur={this.handleConfirmBlur} />
									)}
								</Form.Item>

								<Form.Item label="Phone Number">
									{getFieldDecorator("phone", {
										rules: [
											{
												required: false,
												message: "Please input your phone number!"
											}
										]
									})(
										<Input
											addonBefore={prefixSelector}
											style={{ width: "100%" }}
										/>
									)}
								</Form.Item>

								<Form.Item {...tailFormItemLayout}>
									<Button type="primary" htmlType="submit">
										Register
									</Button>
								</Form.Item>
							</Form>
						</Col>
					</Row>
				</Content>
			</Layout>
		);
	}
}

RegistrationForm = Form.create({ name: "register" })(RegistrationForm);

export default RegistrationForm;
