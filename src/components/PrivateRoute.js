import { useAuth } from "../hooks/useAuth";
import { Redirect, Route } from "react-router-dom";

function PrivateRoute({ children, ...rest }) {
	const [sessionToken] = useAuth().useSessionToken;

	return (
		<Route
			{...rest}
			render={({ location }) =>
				sessionToken !== null ? (
					children
				) : (
					<Redirect
						to={{
							pathname: "/login",
							state: { from: location }
						}}
					/>
				)
			}
		/>
	);
}

export default PrivateRoute;