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
	Dropdown
} from "antd";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Cards from "./Cards"
import "./Homepage.css";
import Nav from './Navigator'

const { Tile } = Typography;
const { Header, Content, Footer } = Layout;

class Homepage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			product : [
			]
		}
		
	}
	componentDidMount() {
		fetch("/api/card")
		.then(res => { return res.json()})
		.then(data => {
			console.log(data)
			this.product.push(data[0])
			let products = this.state.product.map(product=>{
				return(
						<div>
							<Cards product={product}/>
						</div>
				)
			})
			this.setState({
				product : products
			})			
		});
  	}

	render() {
		const menu = (
			<Menu>
				<Menu.Item key="0">
						<Icon type="mobile" /> Mobiles
				</Menu.Item>
				<Menu.Item key="1">
						<Icon type="laptop" /> Laptops
				</Menu.Item>
				<Menu.Item key="2">
						<Icon type="desktop" /> Televisions
				</Menu.Item>
				<Menu.Item key="3">
						<Icon type="sound" /> Headphones
				</Menu.Item>
				<Menu.Item key="4">
						<Icon type="play-circle" /> Consoles
				</Menu.Item>
			</Menu>
		);
		console.log(this.state.product)
		const { Search } = Input;
		return (
			<Layout className="layout">
				<Nav />
				<Content style={{ padding: "0 10px" }}>
					<div align="center" style={{ padding: "10px" }}>
						Categories :{" "}
						<Dropdown.Button overlay={menu} trigger={["click"]} icon={<Icon type = "down"/>}>
							<a className="ant-dropdown-link" href="#">
								All
							</a>
						</Dropdown.Button>
					</div>
					<div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
						<Link to="/login">
							<Button type="primary" size="large">
								Login
							</Button>
						</Link>
						<Carousel autoplay>
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
						{this.state.products}
					</div>
				</Content>
			</Layout>
		);
	}
}
export default Homepage;