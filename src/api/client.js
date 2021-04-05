import { ApolloClient, InMemoryCache } from '@apollo/client';

const SERVER_URI = 'http://localhost:3333/graphql'

const client = new ApolloClient({
    uri: SERVER_URI,
    cache: new InMemoryCache()
});

export default client;