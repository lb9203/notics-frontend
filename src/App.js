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
import NoticsDrawer from "./components/drawer/NoticsDrawer/NoticsDrawer";
import { useState } from "react";
import { useAuth } from "./hooks/useAuth";

function App() {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [sessionToken] = useAuth().useSessionToken;

	return (
		<ApolloProvider client={useClient()}>
			<Router>
				<div className="main">
					{sessionToken &&
					<nav>
						<NoticsDrawer open={drawerOpen} onOpen={() => setDrawerOpen(true)} onClose={() => setDrawerOpen(false)}/>
					</nav>}
					<div className="content">
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
								<div className="content">
								</div>
							</PrivateRoute>
						</Switch>
					</div>

				</div>
			</Router>

		</ApolloProvider>
	);
}


export default App;
