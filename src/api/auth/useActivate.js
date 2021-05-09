import { gql, useMutation } from "@apollo/client";

const ACTIVATE_MUTATION = gql`
	mutation activate($activationToken: String!) {
		activate(activationToken: $activationToken)
	}
`;

function useActivate() {
	const [activate, { loading }] = useMutation(ACTIVATE_MUTATION);

	const handleActivate = async (activationToken) => {
		const {
			data: {
				activate: activatedEmail
			}
		} = await activate({ variables: { activationToken: activationToken } });

		return activatedEmail;
	}

	return [handleActivate, loading];
}

export default useActivate;