import { gql, useLazyQuery } from "@apollo/client";

const ACCESS_TOKEN_QUERY = gql`
	query accessToken($sessionToken: String!) {
    	accessToken(sessionToken: $sessionToken)
    }
`;

function useGetAccessToken(accessToken) {
	const [execute, {data, loading, error}] = useLazyQuery(ACCESS_TOKEN_QUERY);

	const get = async (sessionToken) => {
		execute({variables:{sessionToken: sessionToken}});

		while (loading) {

		}

		if (error) {
			throw error;
		}

		if (data) {
			return data.accessToken;
		}
	}

	return [get, loading];
}

export default useGetAccessToken;