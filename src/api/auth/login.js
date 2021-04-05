import { useMutation, gql } from '@apollo/client';
import React, { useEffect } from 'react';

const LOGIN = gql`
	mutation login($email: String!, $password: String!) {
		login(
			email: $id
			password: $password
		)
	}
`;

function Login(email, password) {
	const [login] = useMutation(LOGIN);

	useEffect(() => {
		login({ variables: { email, password } });
	})

}

export default Login;