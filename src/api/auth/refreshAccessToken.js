import { gql } from "@apollo/client/core";

const ACCESS_TOKEN_QUERY = gql`
	query accessToken($sessionToken: String!) {
    	accessToken(sessionToken: $sessionToken)
    }
`;

async function refreshAccessToken({ client, sessionToken }) {
	const res = await client.query({ query: ACCESS_TOKEN_QUERY, variables: { sessionToken: sessionToken } })

	const {
		data: {
			accessToken: accessToken
		}
	} = res;

	return accessToken;
}

export default refreshAccessToken;