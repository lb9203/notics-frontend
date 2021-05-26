import {
	BrowserRouter as Router, Redirect,
	Route,
	Switch,
} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import AuthPage from "./components/pages/AuthPage";
import ActivatePage from "./components/pages/ActivatePage";
import './style/style.scss';
import useClient from "./api/useClient";
import { ApolloProvider } from "@apollo/client";

function App() {
	return (
		<ApolloProvider client={useClient()}>
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
		</ApolloProvider>
	);
}


export default App;
