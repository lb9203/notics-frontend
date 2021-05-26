import { gql, useLazyQuery } from "@apollo/client";

const COLLECTION_QUERY = gql`
	query collection($collectionId: String) {
    	collection(collectionId: $collectionId) {
    		collectionId
    		name
    		description
    		children {
    			name
    		}
    	}
    }
`;

function useGetCollection() {
	const [getCollections, { loading, data, errors }] = useLazyQuery(COLLECTION_QUERY);

	const handleGetCollections = async (collectionId = null) => {
		const data = getCollections({ variables: { collectionId: collectionId } });
	}

	return [handleGetCollections, loading, data, errors ];
}

export default useGetCollection;