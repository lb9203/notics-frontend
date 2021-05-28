import { gql, useQuery } from "@apollo/client";

const COLLECTION_QUERY = gql`
	query collection($collectionId: String, $parentCollectionId: String) {
    	collection(collectionId: $collectionId, parentCollectionId: $parentCollectionId) {
    		collectionId
    		parentCollectionId
    		name
    		description
    		children {
    			collectionId
    		}
    	}
    }
`;

function useGetCollection({ collectionId, parentCollectionId }) {
	const { loading, data, errors } = useQuery(
		COLLECTION_QUERY, {
			variables: {
				collectionId: collectionId,
				parentCollectionId: parentCollectionId
			}
		}
	);

	return { loading, data, errors };
}

export default useGetCollection;