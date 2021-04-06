import { useMutation, gql } from '@apollo/client';

const LOGIN_MUTATION = gql`
	mutation login($email: String!, $password: String!) {
    	login(email: $email, password: $password)
    }`;

function useLogin() {
	const [login, { loading }] = useMutation(LOGIN_MUTATION);

	const handleLogin = async (email, password) => {
		const {
			data: {
				login: sessionToken
			}
		} = await login({ variables: { email: email, password: password } });

		return sessionToken;

	}

	return {
		handleLogin: handleLogin,
		isLoading: loading,
	}
}

export default useLogin;