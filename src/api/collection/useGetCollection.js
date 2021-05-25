import { gql, useLazyQuery } from "@apollo/client";

const COLLECTION_QUERY = gql`
	query collection($collectionId: String) {
    	collection(sessionToken: $sessionToken)
    }
`;

function useGetCollection() {
	const [getCollection, { loading, data, error }] = useLazyQuery(COLLECTION_QUERY);

	const handleGetCollection = async (sessionToken) => {
		const data = await getCollection({ variables: { sessionToken: sessionToken } });

		if (error) {
			throw error;
		}

		return data;
	}

	return [handleGetCollection, loading];
}

export default useGetCollection;