import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Result, Button } from "antd";

const AccessDenied = () => {
	return (
		<Result
			status="403"
			title="403"
			subTitle="Sorry, you are not authorized to access this page."
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

export default AccessDenied;
