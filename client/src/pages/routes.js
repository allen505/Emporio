import Login from "./Login";
import Homepage from "./Homepage";
import Error404 from "./Error404"

const routes = [
	{
		path: "/Homepage",
		component: Homepage
	},
	{
		path: "/Login",
		component: Login
	},
	{
		path: "/Error404",
		component: Error404
	}
];

export default routes;
