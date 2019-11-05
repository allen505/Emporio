import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Error404 from "./pages/Error404";
import RegistrationForm from "./pages/Register";
import Admin from "./pages/Admin";
import AccessDenied from "./pages/AccessDenied";
import Seller from "./pages/Seller";

const routes = [
	{
		path: "/homepage",
		component: Homepage
	},
	{
		path: "/error404",
		component: Error404
	},
	{
		path: "/accessdenied",
		component: AccessDenied
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
	},

	{
		path: "/seller",
		component: Seller
	}
];

export default routes;
