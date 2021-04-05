import { useMutation, gql } from '@apollo/client';
import React, { useEffect, useState } from 'react';

const LOGIN_MUTATION = gql`
	mutation login($email: String!, $password: String!) {
    	login(
        	email: $id
        	password: $password
        	) {
        		sessionToken
        	}
          	`;

function UseLogin(email, password) {
	const [login, {data,loading,error}] = useMutation(LOGIN_MUTATION);

	const handleLogin = async (email, password) => {
		try {
			const {
				data: {
					login: { sessionToken }
				}
			} = await login({ variables: {email: email, password: password} });

			return sessionToken;
		} catch (error) {
			console.log(error);
		}
	}

	return {
		activateUser: handleLogin,
		result: data,
		isLoading: loading,
		error
	}
}

export default UseLogin;