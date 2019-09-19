import React from "react";
import { Menu,Input } from "antd";
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
				<Menu.Item key="1">Brand Name</Menu.Item>
				<Search
                  placeholder="Search for the items"
                  onSearch={value => console.log(value)}
                  style={{ width: 1150 , margin:"20px"}}
                />
				<Menu.Item key="2">Home</Menu.Item>
				<Menu.Item key="3">Cart</Menu.Item>
				<Menu.Item key="4">User</Menu.Item>
			</Menu>

	);
};

export default Nav;
