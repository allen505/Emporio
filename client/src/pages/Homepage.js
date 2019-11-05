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

import Cards from "./Cards";
import "./Homepage.css";
import Nav from "./Navigator";
import Grid from "antd/lib/card/Grid";
import { string } from "prop-types";

const { Tile } = Typography;
const { Header, Content, Footer } = Layout;

class Homepage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			productList: [],
			category: "All",
			userid: null
		};
		this.handleMenuClick = this.handleMenuClick.bind(this);

		try {
			this.state.userid = props.location.state.id;
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
	}
	handleMenuClick(e) {
		this.setState({
			category: String(e.key)
		});
		console.log(this.state.category);
	}

	productArea = () => {
		return <Cards product={this.state.productList} id={this.state.userid} />;
	};

	render() {
		const menu = (
			<Menu>
				<Menu.Item key="Mobiles" onClick={this.handleMenuClick}>
					<Icon type="mobile" /> Mobiles
				</Menu.Item>
				<Menu.Item key="Laptop" onClick={this.handleMenuClick}>
					<Icon type="laptop" /> Laptops
				</Menu.Item>
				<Menu.Item key="Television" onClick={this.handleMenuClick}>
					<Icon type="desktop" /> Televisions
				</Menu.Item>
				<Menu.Item key="Headphones" onClick={this.handleMenuClick}>
					<Icon type="sound" /> Headphones
				</Menu.Item>
				<Menu.Item key="Consoles" onClick={this.handleMenuClick}>
					<Icon type="play-circle" /> Consoles
				</Menu.Item>
			</Menu>
		);
		return (
			<Layout className="layout">
				<Nav product={this.state.productList} />
				<Content style={{ padding: "0 10px" }}>
					<div align="center" style={{ padding: "10px" }}>
						Categories :{" "}
						<Dropdown.Button
							overlay={menu}
							trigger={["click"]}
							icon={<Icon type="down" />}
						>
							All
						</Dropdown.Button>
					</div>
					<div style={{ background: "#fff", padding: 24 }}>
						<Link to="/login">
							<Button type="primary" size="large">
								Login
							</Button>
						</Link>
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
