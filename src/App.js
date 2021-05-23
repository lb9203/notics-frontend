import {
	BrowserRouter as Router, Redirect,
	Route,
	Switch,
} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import AuthPage from "./components/pages/AuthPage";
import ActivatePage from "./components/pages/ActivatePage";
import './style/style.scss';

function App() {
	return (
		<Router>
			<div>
				<Switch>
					<Route exact path="/">
						<Redirect to="/home"/>
					</Route>
					<Route exact path="/auth">
						<AuthPage/>
					</Route>
					<Route exact path="/activate">
						<ActivatePage/>
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
