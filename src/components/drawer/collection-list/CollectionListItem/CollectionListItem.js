import PropTypes from "prop-types";
import {
	Box,
	Collapse,
	ListItem,
	ListItemIcon,
	ListItemSecondaryAction,
	ListItemText
} from "@material-ui/core";
import { useState } from "react";
import { DeleteOutlineRounded, KeyboardArrowDownRounded, KeyboardArrowRightRounded } from "@material-ui/icons";
import CollectionListLevel from "../CollectionListLevel/CollectionListLevel";
import LoadingIconButton from "../../../inputs/LoadingIconButton/LoadingIconButton";
import useDeleteCollection from "../../../../api/collection/useDeleteCollection";
import "./CollectionListItem.scss";

function CollectionListItem({ collection }) {
	const [open, setOpen] = useState(false);
	const [handleDeleteCollection, deleteLoading] = useDeleteCollection();

	const handleDelete = async () => {
		try {
			const deleted = await handleDeleteCollection(collection.collectionId);
		} catch (e) {

		}
	}

	return (
		<Box>
			<ListItem className="collection-list-item" button onClick={() => setOpen(!open)} key={collection.collectionId}>
				<ListItemIcon>
					{open ? <KeyboardArrowDownRounded /> : <KeyboardArrowRightRounded />}
				</ListItemIcon>
				<ListItemText primaryTypographyProps={{noWrap: true}}>
					{collection.name}
				</ListItemText>
				<ListItemSecondaryAction>
					<LoadingIconButton isLoading={deleteLoading} onClick={() => handleDelete()}>
						<DeleteOutlineRounded />
					</LoadingIconButton>
				</ListItemSecondaryAction>
			</ListItem>
			<Collapse in={open} timeout="auto" className="nested-list" unmountOnExit>
				<CollectionListLevel collections={collection.children} parentId={collection.collectionId}/>
			</Collapse>
		</Box>
	);
}

CollectionListItem.propTypes = {
	collection: PropTypes.object.isRequired
}

export default CollectionListItem;