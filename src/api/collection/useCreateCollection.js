import { gql, useMutation } from "@apollo/client"

const CREATE_COLLECTION_MUTATION = gql`
	mutation createCollection($name: String!, $parentCollectionId: Int, $description: String) {
		createCollection(
			name: $name
			parentCollectionId: $parentCollectionId
			description: $description
		){
			collectionId
			parentCollectionId
			name
			description
    	}
	}
`;

function useCreateCollection() {
	const [createCollection, {loading}] = useMutation(CREATE_COLLECTION_MUTATION, {
		update: (cache, { data: { createCollection }}) => {
			cache.modify({
				fields: {
					collection(existingCollections = []) {
						const newCollectionRef = cache.writeFragment({
							data: createCollection,
							fragment: gql`
								fragment newCollection on Collection {
									collectionId
									parentCollectionId
									name
									description
								}
							`
						});

						return [...existingCollections, newCollectionRef];
					}
				}
			});
		}
	});

	const handleCreateCollection = async ({ name, parentCollectionId, description }) => {
		const {
			data: {
				createCollection: collection
			}
		} = await createCollection({ variables: { name: name, parentCollectionId: parentCollectionId, description: description } });

		return collection;
	}

	return [handleCreateCollection, loading];
}

export default useCreateCollection;