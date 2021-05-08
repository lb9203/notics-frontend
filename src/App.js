import './App.css';
import {
	BrowserRouter as Router, Redirect,
	Route,
	Switch,
} from "react-router-dom";
import NoticsNavbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import AuthPage from "./components/AuthPage";

function App() {
	return (
		<Router>
			<div>
				<NoticsNavbar/>
				<Switch>
					<Route exact path="/">
						<Redirect to="/home"/>
					</Route>
					<Route exact path="/login">
						<AuthPage/>
					</Route>
					<PrivateRoute path="/home">
						home
					</PrivateRoute>
				</Switch>
			</div>
		</Router>
	);
}


export default App;
