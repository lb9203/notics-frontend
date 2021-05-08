import { gql, useMutation } from "@apollo/client";

const REGISTER_MUTATION = gql`
	mutation register($email: String!, $password: String!, $displayName: String!) {
    	register(email: $email, password: $password, displayName: $displayName)
    }`;

export function useRegister() {
	const [register, { loading }] = useMutation(REGISTER_MUTATION);

	const handleRegister = async (email, password, displayName) => {
		const {
			data: {
				register: confirmationEmail
			}
		} = await register({ variables: { email: email, password: password, displayName: displayName } });

		return confirmationEmail;
	}

	return [handleRegister, loading]
}

export default useRegister;