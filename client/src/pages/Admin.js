import React from "react";
import { BrowserRouter as Link } from "react-router-dom";

import { Typography } from "antd";

const { Title } = Typography;

class Admin extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <Title>This is the Admin's page</Title>;
	}
}
export default Admin;
