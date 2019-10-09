import React from "react";
import { Menu, Input, Icon, Dropdown } from "antd";
import "./Login.css";

class Nav extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			productList : [],
			searchList : []
		}
	}

	handleChange = e => {
		let items = this.state.productList;
		items = items.filter((item) => {
		  return item.toLowerCase().search(e.target.value.toLowerCase()) !== -1;
		});
		this.setState({
			searchList: items
		});
	}

	render() {

	const { Search } = Input;

	var name = this.props.product.map(Pname => {
		return Pname.Pname;
	})

	this.state.productList = name;

	const menu = this.state.searchList.map( search =>{
		return(
		  <Menu.Item key = {search}>
			{search}
		  </Menu.Item>
		)
	});

	const searchList= (
		<Menu>
			{menu}
		</Menu>
	)

	return (
		<Menu
			theme="dark"
			mode="horizontal"
			defaultSelectedKeys={["2"]}
			style={{ lineHeight: "64px" }}
		>
			<Menu.Item key="1">Emporio</Menu.Item>
			<Dropdown overlay = {searchList} trigger = {['click']}>
			<Search
				placeholder="Search for the items"
				onSearch={value => console.log(value)}
				style={{ width: 1000, margin: "0 20px 0 20px" }}
				vlaue = {menu.key}
				onChange = {this.handleChange}
			/>
			</Dropdown>
			<Menu.Item key="2"><Icon type= "home" />Home</Menu.Item>
			<Menu.Item key="3"><Icon type = "shopping-cart"/>Cart</Menu.Item>
			<Menu.Item key="4"><Icon type = "user"/>User</Menu.Item>
		</Menu>
	);
}
};

export default Nav;
