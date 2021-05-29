import { Box, ListSubheader } from "@material-ui/core";
import useGetCollection from "../../../../api/collection/useGetCollection";
import { useEffect, useState } from "react";
import { cloneDeep } from "@apollo/client/utilities";
import CollectionListLevel from "../CollectionListLevel/CollectionListLevel";
import "./CollectionList.scss"

const listToTree = (parentId, collections) => {
	const roots = collections.filter((collection) => {
		return collection.parentCollectionId === parentId;
	});

	roots.forEach((root) => {
		root.children = listToTree(root.collectionId, collections);
	});

	return roots;
}

function CollectionList() {
	const { loading, data, errors } = useGetCollection({ collectionId: null, parentCollectionId: null });
	const [collections, setCollections] = useState([]);

	useEffect(() => {
		if (data) {
			const {collection: collections} = cloneDeep(data);

			setCollections(listToTree(null, collections));
		}
	}, [data])

	return (
		<Box className="collection-list">
			<CollectionListLevel collections={collections} parentId={null} subheader={(<ListSubheader>Collections</ListSubheader>)}/>
		</Box>
	);
}

export default CollectionList;