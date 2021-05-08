import { gql, useMutation } from "@apollo/client";
import { useAuth } from "../../hooks/useAuth";

const LOGOUT_MUTATION = gql`
	mutation logout($sessionToken: String!) {
    	logout(sessionToken: $sessionToken)
    }`;

export function useLogout() {
	const [logout, { loading }] = useMutation(LOGOUT_MUTATION);
	const [sessionToken, , clearSessionToken] = useAuth().useSessionToken;

	const handleLogout = async () => {
		const {
			data: {
				logout: success
			}
		} = await logout({ variables: { sessionToken: sessionToken } });

		if (success === true) {
			clearSessionToken();
		}

		return success;
	}

	return [handleLogout, loading];
}

export default useLogout;