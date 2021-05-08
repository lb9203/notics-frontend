import { gql, useMutation } from "@apollo/client";

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

export default useIsSessionOpen;