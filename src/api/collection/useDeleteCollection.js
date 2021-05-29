import { gql, useMutation } from "@apollo/client"

const DELETE_COLLECTION_MUTATION = gql`
	mutation deleteCollection($collectionId: Int!) {
		deleteCollection(collectionId: $collectionId){
			collectionId
			parentCollectionId
			name
			description
    	}
	}
`;

function useDeleteCollection() {
	const [deleteCollection, {loading}] = useMutation(DELETE_COLLECTION_MUTATION, {
		update: (cache, { data: { deleteCollection }}) => {
			cache.modify({
				fields: {
					collection(existingCollections = [], {readField}) {
						const deletedIds = deleteCollection.map(value => {
							return cache.identify(value);
						})

						return existingCollections.filter(collectionRef => {
							return !deletedIds.includes(cache.identify(collectionRef));
						});
					}
				}
			});
		}
	});

	const handleDeleteCollection = async (collectionId) => {
		const {
			data: {
				deleteCollection: collections
			}
		} = await deleteCollection({ variables: { collectionId: collectionId } });

		return collections;
	}

	return [handleDeleteCollection, loading];
}

export default useDeleteCollection;