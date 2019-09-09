import React from "react";
import { Menu } from "antd";
import "./Login.css";
import logo from "./Error404.gif";

const Error404 = () => {
	return (
		<div style={{ backgroundColor: "black", width: "100%" ,height: "100%"}}>
			<center>
				<img
					src={logo}
					style={{
						width: "100%",
						height: "100%",
						display: "block",
						margin: "auto",
						position: "relative"
					}}
				/>
			</center>
		</div>
	);
};

export default Error404;
