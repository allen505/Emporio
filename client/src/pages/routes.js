import WrappedLogin from "./Login";
import Homepage from "./Homepage";

const routes = [
	{
		path: '/login',
		component: WrappedLogin
	},
	{
		path: "/homepage",
		component: Homepage
	}
];

export default routes;
