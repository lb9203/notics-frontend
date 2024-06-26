import { gql, useQuery } from "@apollo/client";

const COLLECTION_QUERY = gql`
	query collection($collectionId: ID, $parentCollectionId: ID) {
    	collection(collectionId: $collectionId, parentCollectionId: $parentCollectionId) {
    		collectionId
    		parentCollectionId
    		name
    		description
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