import { gql, useMutation } from "@apollo/client";

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

export default useLogin;