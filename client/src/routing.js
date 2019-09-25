import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Error404 from "./pages/Error404";
import RegistrationForm from "./pages/Register";
const routes = [
	{
		path: "/login",
		component: Login
	},
	{
		path: "/homepage",
		component: Homepage
	},
	{
		path: "/error404",
		component: Error404
	},
	{
		path: "/register",
		component: RegistrationForm
	}
];

export default routes;
