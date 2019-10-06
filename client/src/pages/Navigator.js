import React from "react";
import { Menu, Input, Icon } from "antd";
import "./Login.css";

const Nav = () => {
	const { Search } = Input;
	return (
		<Menu
			theme="dark"
			mode="horizontal"
			defaultSelectedKeys={["2"]}
			style={{ lineHeight: "64px" }}
		>
			<Menu.Item key="1">Emporio</Menu.Item>
			<Search
				placeholder="Search for the items"
				onSearch={value => console.log(value)}
				style={{ width: 1100, margin: "0 20px 0 20px" }}
			/>
			<Menu.Item key="2"><Icon type= "home" />Home</Menu.Item>
			<Menu.Item key="3"><Icon type = "shopping-cart"/>Cart</Menu.Item>
			<Menu.Item key="4"><Icon type = "user"/>User</Menu.Item>
		</Menu>
	);
};

export default Nav;
