import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Error404 from "./pages/Error404";
import RegistrationForm from "./pages/Register";
import Admin from "./pages/Admin";

const routes = [
	{
		path: "/homepage",
		component: Homepage
	},
	{
		path: "/login",
		component: Login
	},
	{
		path: "/error404",
		component: Error404
	},
	{
		path: "/login",
		component: Login
	},

	{
		path: "/register",
		component: RegistrationForm
	},
	{
		path: "/admin",
		component: Admin
	}
];

export default routes;
