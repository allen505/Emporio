import React from "react";
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
	List
} from "antd";

const { Title } = Typography;
const { Header, Content, Footer } = Layout;

class Admin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// loading : true
			radioState : "buyer"
		}
		try {
			this.state = {
				auth: props.location.state.authority
			};
		} catch (e) {
			console.log(e);
			this.state = {
				auth: false
			};
		}

		setTimeout(() => {
			console.log(this.state.auth);
		}, 100);
	}
	state = {
		// radioState : "buyer",
		loading : true
	};

	radioChange = selected => {
		this.setState({
			radioState: selected.target.value
		});
	};
	
	buyerlist = () => {
		// const {loading} = this.state
		if(this.state.radioState == "buyer"){
		fetch("/api/admin")
			.then(res => {
				return res.json();
			})
			.then(data => {
				let tempProduct = [];
				data.map(prod => {
					if(prod.type == "buyer"){
						tempProduct.push(prod.name);
					}
				});
				this.setState({
					list : tempProduct
				});
			});
		}
		if(this.state.radioState == "seller"){
			fetch("/api/admin")
				.then(res => {
					return res.json();
				})
				.then(data => {
					let tempProduct = [];
					data.map(prod => {
						if(prod.type == "seller"){
							tempProduct.push(prod.name);
						}
					});
					this.setState({
						list : tempProduct
					});
				});
			}
			return(
				<List
					bordered = "true"
					loading = {this.state.loading}
					itemLayout="horizontal"
					dataSource={this.state.list}
					renderItem={item => (
					<List.Item
								actions={[<Icon type = "delete" theme = "twoTone" onClick></Icon>]}
							>						
					<List.Item.Meta
						title={item}
						/>
					</List.Item>
					)}
				/>
			);
		
	}

	render() {
		// setTimeout(() => {
		// 	this.setState(() => ({
		// 		loading : false
		// 	}))
		// },100);
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
							<this.buyerlist/>
						</Col>
					</Row>
				</Content>
			</Layout>
		);
	}
}
export default Admin;
