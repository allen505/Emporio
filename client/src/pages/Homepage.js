import React from "react";
import {
	Menu,
	Icon,
	Typography,
	Layout,
	Input,
	Button,
	Row,
	Col,
	Carousel,
	Dropdown,
	Card
} from "antd";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Cookies from "universal-cookie";

import Cards from "./Cards";
import "./Homepage.css";
import Nav from "./Navigator";

const { Tile } = Typography;
const { Header, Content, Footer } = Layout;
const cookies = new Cookies();

class Homepage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			productList: [],
			category: "All",
			userid: null,
			loggedin: false,
			categories : []
		};
		this.handleMenuClick = this.handleMenuClick.bind(this);

		try {
			this.state.userid = cookies.get("userid");
			if (this.state.userid != undefined) this.state.loggedin = true;
			// this.forceUpdate()
		} catch (e) {
			console.log(e);
		}
	}

	componentDidMount() {
		fetch("/api/card")
			.then(res => {
				return res.json();
			})
			.then(data => {
				// this.productList.push(data[0])
				let tempProduct = [];
				data.map(prod => {
					// console.log(prod);
					tempProduct.push(prod);
				});
				this.setState({
					productList: tempProduct
				});
			});
		fetch("/api/card/category")
			.then(res => {
				return res.json();
			})
			.then(data => {
				let cate = []
				data.map( cat => {
					cate.push(cat.Category);
				});
				this.setState({
					categories : cate
				})
			});
	}
	handleMenuClick(e) {
		this.setState({
			category: String(e.key)
		});
		console.log(this.state.category);
	}

	productArea = () => {
		return <Cards product={this.state.productList} id={this.state.userid}/>;
	};

	menu = () => {
			return (
				<Menu>
					{this.state.categories.map(prod =>{
						return(
							<Menu.Item key = {prod} onClick={this.handleMenuClick}>
								{prod}
							</Menu.Item>
						)
					})}
				</Menu>
		);
	}
	render() {
		return (
			<Layout className="layout">
				<Nav
					product={this.state.productList}
					accType="buyer"
					loggedin={this.state.loggedin}
				/>
				<Content style={{ padding: "0 10px" }}>
					<div align="center" style={{ padding: "10px" }}>
						Categories :{" "}
						<Dropdown.Button
							overlay={this.menu}
							trigger={["click"]}
							icon={<Icon type="down" />}
						>
							All
						</Dropdown.Button>
					</div>
					<div style={{ padding: 20 }}>
						<Carousel autoplay style={{ padding: "10px 0" }}>
							<div align="center">
								<img
									src={require("../Images/mobile.jpg")}
									alt="Please display"
									height="400"
									width="1500"
								/>
							</div>
							<div align="center">
								<img
									src={require("../Images/laptop.jpg")}
									alt="Please display"
									height="400"
									width="1500"
								/>
							</div>
							<div align="center">
								<img
									src={require("../Images/television.jpg")}
									alt="Please display"
									height="400"
									width="1500"
								/>
							</div>
							<div align="center">
								<img
									src={require("../Images/headphone.jpg")}
									alt="Please display"
									height="400"
									width="1500"
								/>
							</div>
							<div align="center">
								<img
									src={require("../Images/consoles.jpg")}
									alt="Please display"
									height="400"
									width="1500"
								/>
							</div>
						</Carousel>
						<this.productArea />
					</div>
				</Content>
			</Layout>
		);
	}
}
export default Homepage;
