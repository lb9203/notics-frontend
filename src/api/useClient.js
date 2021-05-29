import { ApolloClient, from, HttpLink, InMemoryCache, ApolloLink } from '@apollo/client';
import { useAuth } from "../hooks/useAuth";
import { onError } from "@apollo/client/link/error";
import refreshAccessToken from "./auth/refreshAccessToken";

const SERVER_URI = 'http://localhost:3333/graphql'

function useClient() {

	const [sessionToken, saveSessionToken, clearSessionToken] = useAuth().useSessionToken;
	const [accessToken, setAccessToken] = useAuth().useAccessToken;

	const fallbackClient =  new ApolloClient({
		cache: new InMemoryCache(),
		uri: SERVER_URI
	});

	const httpLink = new HttpLink({ uri: SERVER_URI });

	const authMiddleware = new ApolloLink((operation, forward) => {
		//Set Authorization header if accessToken is not null.
		operation.setContext(({ headers = {} }) => ({
			headers: {
				...headers,
				...(accessToken !== null ? { Authorization: accessToken } : {})
			}
		}));

		return forward(operation);
	})

	const errorLink = onError(({ graphQLErrors, networkError, operation, forward, }) => {
		if (graphQLErrors) {
			graphQLErrors.forEach(({ extensions: { code } }) => {
				switch (code) {
					case "UNAUTHENTICATED": {
						//Delete current access token.
						setAccessToken(null);

						//Attempt to get new access token.
						refreshAccessToken({ client: fallbackClient, sessionToken: sessionToken })
							.then((value => {
								setAccessToken(value);
								console.log("Access token refreshed, retrying.");

								// Retry last operation.
								forward(operation);
							}))
							.catch(error => {
								console.log("Access token fetch failed, redirecting to login.");
								clearSessionToken();
								window.location.reload();
							});
					}
				}
			});
		}
	});

	return new ApolloClient({
		cache: new InMemoryCache({
			typePolicies: {
				Collection: {
					keyFields: ["collectionId"]
				}
			}
		}),
		link: from([
			authMiddleware,
			errorLink,
			httpLink,
		])
	});
}

export default useClient;