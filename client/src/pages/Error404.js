/* eslint-disable */
import React from "react";
import { BrowserRouter as Router, Route, Link} from "react-router-dom";

import { Result, Button } from "antd";

const Error404 = () => {
	return (
		<Result
			status="404"
			title="404"
			subTitle="Sorry, the page you tried to visit does not exist."
			extra={
				<Link to="/">
					<Button type="primary" size="large">
						Go Home
					</Button>
				</Link>
			}
		/>
	);
};

export default Error404;
