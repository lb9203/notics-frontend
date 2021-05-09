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
							pathname: "/auth",
							state: { from: location }
						}}
					/>
				)
			}
		/>
	);
}

export default PrivateRoute;