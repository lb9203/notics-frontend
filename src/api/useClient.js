import { ApolloClient, from, HttpLink, InMemoryCache, ApolloLink, fromPromise } from '@apollo/client';
import { useAuth } from "../hooks/useAuth";
import { onError } from "@apollo/client/link/error";
import refreshAccessToken from "./auth/refreshAccessToken";

const SERVER_URI = 'http://localhost:3333/graphql'

function useClient() {
	const fallbackClient = new ApolloClient({
		uri: SERVER_URI,
		cache: new InMemoryCache()
	});

	const [sessionToken, saveSessionToken, clearSessionToken] = useAuth().useSessionToken;
	const [accessToken, setAccessToken] = useAuth().useAccessToken;

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

	const errorLink = onError(
		({
			 graphQLErrors,
			 networkError,
			 operation,
			 forward
		 }) => {
			if (graphQLErrors) {
				if (graphQLErrors) {
					graphQLErrors.forEach(({extensions: {code}}) => {
						switch (code) {
							case "UNAUTHENTICATED":
								//TODO: Implement refresh of access token.
								console.log(code);
								break;
						}
					});
				}
			}
		}
	);

	return new ApolloClient({
		cache: new InMemoryCache(),
		link: from([
			authMiddleware,
			errorLink,
			httpLink,
		])
	});
}

export default useClient;