/* eslint-disable */
import React from "react";
import {
	Menu,
	Icon,
	Typography,
	Layout,
	BackTop,
	Carousel,
	Dropdown
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
			categories : [],
			displayList : []
		};
		this.handleMenuClick = this.handleMenuClick.bind(this);

		try {
			this.state.userid = cookies.get("userid");
			if (this.state.userid != undefined) this.state.loggedin = true;
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
					productList: tempProduct,
					displayList: tempProduct
				});
			});
		fetch("/api/card/category")
			.then(res => {
				return res.json();
			})
			.then(data => {
				let cate = []
				data.map( cat => {
					cate.push(cat);
				});
				this.setState({
					categories : cate
				})
			});
	}
	handleMenuClick(e) {
			this.state.displayList = this.state.productList.filter(item => {
				if(e.key=="ALL"){
					return item;
				}
				if(item.category==e.key){
					// console.log(item)
					return item;
				}
				else{
					// console.log(item.category+e.key)
					// console.log("not matching")
				}
			});
		this.setState({
			category: String(e.key)
		});
	}

	productArea = () => {
		return <Cards product={this.state.displayList} id={this.state.userid}/>;
	};

	menu = () => {
			return (
				<Menu>
					<Menu.Item key="ALL" onClick={this.handleMenuClick}>
						All
					</Menu.Item>
					{this.state.categories.map(prod =>{
						return(
							<Menu.Item key = {prod.Category} onClick={this.handleMenuClick}>
								{prod.Category}
							</Menu.Item>
						)
					})}
				</Menu>
		);
	}
	render() {
		return (
      <Layout className="layout">
        <BackTop>
          <div
            className="ant-back-top-inner"
            style={{
              padding: 21,
              paddingRight: 34,
              background: "	#C0C0C0",
              borderRadius: 7
            }}
          >
            <Icon type="up" />
          </div>
        </BackTop>
        <Nav product={this.state.productList} loggedin={this.state.loggedin} />
        <Content style={{ padding: "0 10px" }}>
          <div align="center" style={{ padding: "10px" }}>
            Categories :{" "}
            <Dropdown.Button
              overlay={this.menu}
              trigger={["click"]}
              icon={<Icon type="down" />}
            >
              {this.state.category}
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
