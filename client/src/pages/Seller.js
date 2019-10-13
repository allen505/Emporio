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

class Seller extends React.Component {
	constructor(props) {
		super(props);
		this.state = { userid: null };
		try {
			this.state.userid = props.location.state.id;
		} catch (e) {
			this.props.history.push("/accessdenied");
		}
	}

	render() {
		return (
			<div>
				<p>This is the Sellers' page</p>
			</div>
		);
	}
}
export default Seller;
