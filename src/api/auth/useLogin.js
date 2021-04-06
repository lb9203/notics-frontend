import { useMutation, gql } from '@apollo/client';

const LOGIN_MUTATION = gql`
	mutation login($email: String!, $password: String!) {
    	login(email: $email, password: $password)
    }`;

function UseLogin() {
	const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);

	const handleLogin = async (email, password) => {
		try {
			const {
				data: {
					login: sessionToken
				}
			} = await login({ variables: { email: email, password: password } });

			return sessionToken;
		} catch (error) {}
	}

	return {
		handleLogin: handleLogin,
		result: data,
		isLoading: loading,
		error: error
	}
}

export default UseLogin;