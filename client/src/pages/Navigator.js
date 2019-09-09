import React from "react";
import { Menu } from "antd";
import "./Login.css";

const Nav = () => {
	return (
			<Menu
				theme="dark"
				mode="horizontal"
				defaultSelectedKeys={["2"]}
				style={{ lineHeight: "64px" }}
			>
				<Menu.Item key="1">Brand Name</Menu.Item>
			</Menu>

	);
};

export default Nav;
