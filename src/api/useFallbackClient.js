import { ApolloClient, from, HttpLink, InMemoryCache } from "@apollo/client";
import { SERVER_URI } from "./useClient";
import { onError } from "@apollo/client/link/error";
import { useAuth } from "../hooks/useAuth";

/**
 * Fallback client meant for querying data from inside links of main client.
 *
 * @returns {ApolloClient}
 */
function useFallbackClient() {
	const [sessionToken, saveSessionToken, clearSessionToken] = useAuth().useSessionToken;
	const [accessToken, setAccessToken] = useAuth().useAccessToken;

	const httpLink = new HttpLink({ uri: SERVER_URI });

	const errorLink = onError(({ graphQLErrors, networkError, operation, forward, }) => {
		if (graphQLErrors) {
			if (graphQLErrors) {
				graphQLErrors.forEach(({ extensions: { code } }) => {
					switch (code) {
						case "INVALID_SESSION_TOKEN": {
							setAccessToken(null);
							clearSessionToken();
							window.location.reload();
						}
					}
				});
			}
		}
	});

	return new ApolloClient({
		cache: new InMemoryCache(),
		link: from([
			errorLink,
			httpLink,
		])
	});
}

export default useFallbackClient;