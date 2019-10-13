import React from "react";
import { BrowserRouter as Link } from "react-router-dom";

import {
	Typography,
	Form,
	Tooltip,
	Icon,
	Input,
	Select,
	Row,
	Col,
	Radio,
	Button,
	Layout,
	message
} from "antd";

const { Title } = Typography;
const { Header, Content, Footer } = Layout;

class Admin extends React.Component {
	constructor(props) {
		super(props);

		try {
			this.state = {
				auth: props.location.state.authority
			};
		} catch (e) {
			this.state = {
				auth: false
			};
		}

		if(this.state.auth==false){
			this.props.history.push("/accessdenied");
		}

	}

	render() {
		return (
			<Layout className="layout" style={{ minHeight: "100vh" }}>
				<Content
					style={{
						padding: "75px 50px",
						marginTop: 64,
						textAlign: "center"
					}}
				>
					<Title level={3}>
						"With great power comes great responsibilty" -Uncle Ben
					</Title>
					<Row type="flex" align="center">
						<Col
							span={8}
							style={{
								padding: "60px",
								backgroundColor: "#ffffff",
								borderRadius: "15px"
							}}
						>
							<Radio.Group
								defaultValue="buyer"
								buttonStyle="solid"
								style={{ margin: "15px" }}
								onChange={this.radioChange}
							>
								<Radio.Button value="buyer">Buyer</Radio.Button>
								<Radio.Button value="seller">Seller</Radio.Button>
							</Radio.Group>
						</Col>
					</Row>
				</Content>
			</Layout>
		);
	}
}
export default Admin;
