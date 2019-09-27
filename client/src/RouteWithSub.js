import { BrowserRouter as Route, Link } from "react-router-dom";
import React from "react";

const RouteWithSub = route => {
	return (
		<Route
			path={route.path}
			render={props => (
				// pass the sub-routes down to keep nesting
				<route.component {...props} routes={route.routes} />
			)}
		/>
	);
};

export default RouteWithSub;
