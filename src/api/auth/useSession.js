import { useMutation, gql } from '@apollo/client';
import { useAuth } from "../../hooks/useAuth";

const LOGIN_MUTATION = gql`
	mutation login($email: String!, $password: String!) {
    	login(email: $email, password: $password)
    }`;

export function useLogin() {
	const [login, { loading }] = useMutation(LOGIN_MUTATION);

	const handleLogin = async (email, password) => {
		const {
			data: {
				login: sessionToken
			}
		} = await login({ variables: { email: email, password: password } });

		return sessionToken;
	}

	return [handleLogin, loading]
}

const LOGOUT_MUTATION = gql`
	mutation logout($sessionToken: String!) {
    	logout(sessionToken: $sessionToken)
    }`;

export function useLogout() {
	const [logout, { loading }] = useMutation(LOGOUT_MUTATION);
	const [sessionToken, saveSessionToken, clearSessionToken] = useAuth().useSessionToken;

	const handleLogout = async () => {
		const {
			data: {
				logout: success
			}
		} = await logout({ variables: { sessionToken: sessionToken } });

		if (success === true){
			clearSessionToken();
		}

		return success;
	}

	return [handleLogout, loading];
}


const IS_SESSION_OPEN_QUERY = gql`
	mutation isSessionOpen($sessionToken: String!) {
    	isSessionOpen(sessionToken: $sessionToken)
    }`;

export function useIsSessionOpen() {
	const [isSessionOpen, { loading }] = useMutation(IS_SESSION_OPEN_QUERY);

	const handleIsSessionOpen = async (sessionToken) => {
		const {
			data: {
				isSessionOpen: success
			}
		} = await isSessionOpen({ variables: { sessionToken: sessionToken } });

		return success;
	}

	return [handleIsSessionOpen, loading];
}