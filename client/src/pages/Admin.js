import React, { Profiler } from "react";
import { Link } from "react-router-dom";

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
	message,
	List,
	Popconfirm
} from "antd";
import Cookies from "universal-cookie";

import Nav from "./Navigator";

const { Title } = Typography;
const { Header, Content, Footer } = Layout;
const cookies = new Cookies();

class Admin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// loading : true
			radioState: "buyer",
			auth: false
		};
		try {
			this.state.auth = cookies.get("auth");
		} catch (e) {
			this.state.auth = false;
		}

		if (this.state.auth != "true") {
			this.props.history.push("/accessdenied");
		}
	}
	state = {
		// radioState : "buyer",
		loading: true
	};

	radioChange = selected => {
		this.setState({
			radioState: selected.target.value
		});
	};
	datafetch = () => {
		fetch("/api/admin")
			.then(res => {
				return res.json();
			})
			.then(data => {
				let buyerlist = [];
				let sellerlist = [];
				data.map(prod => {
					if (prod.type == "buyer") {
						buyerlist.push(prod.name);
					} else if (prod.type == "seller") {
						sellerlist.push(prod.name);
					}
				});
				this.setState({
					blist: buyerlist,
					slist: sellerlist
				});
			});
	};

	delete = (item, type) => {
		let del = {
			type: type,
			name: item
		};
		fetch("/api/admin/del", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(del)
		})
			.then(res => res.json())
			.then(resp => {
				console.log(resp);
			})
			.finally(() => {
				this.datafetch();
			});
	};

	adminlist = e => {
		// const {loading} = this.state
		this.datafetch();
		if (e.value == "seller") {
			return (
				<List
					bordered="true"
					loading={this.state.loading}
					itemLayout="horizontal"
					dataSource={this.state.slist}
					renderItem={item => (
						<List.Item
							actions={[
								<Popconfirm
									title="Are you sure you want to delete?"
									onConfirm={() => {
										this.delete(item, this.state.radioState);
									}}
								>
									<Icon type="delete" theme="twoTone"></Icon>
								</Popconfirm>
							]}
						>
							<List.Item.Meta title={item} />
						</List.Item>
					)}
				/>
			);
		} else {
			return (
				<List
					bordered="true"
					loading={this.state.loading}
					itemLayout="horizontal"
					dataSource={this.state.blist}
					renderItem={item => (
						<List.Item
							actions={[
								<Popconfirm
									title="Are you sure you want to delete?"
									onConfirm={() => {
										this.delete(item, this.state.radioState);
									}}
								>
									<Icon type="delete" theme="twoTone"></Icon>
								</Popconfirm>
							]}
						>
							<List.Item.Meta title={item} />
						</List.Item>
					)}
				/>
			);
		}
	};

	render() {
		// setTimeout(() => {
		// 	this.setState(() => ({
		// 		loading : false
		// 	}))
		// },100);
		return (
			<Layout className="layout" style={{ minHeight: "100vh" }}>
				<Nav loggedin={true} />
				<Content
					style={{
						padding: "75px 50px",
						marginTop: 64,
						textAlign: "center"
					}}
				>
					<Title level={3}>
						"With great power comes great responsibilty"
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
							<this.adminlist value={this.state.radioState} />
						</Col>
					</Row>
				</Content>
			</Layout>
		);
	}
}
export default Admin;
