import PropTypes from "prop-types";
import { Box, Collapse, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { useState } from "react";
import "./CollectionListItem.scss";
import { KeyboardArrowDownRounded, KeyboardArrowRightRounded } from "@material-ui/icons";
import CollectionListLevel from "../CollectionListLevel/CollectionListLevel";

function CollectionListItem({ collection }) {
	const [open, setOpen] = useState(false);

	return (
		<Box className="collection-list-item">
			<ListItem button onClick={() => setOpen(!open)} key={collection.collectionId}>
				<ListItemIcon>
					{open ? <KeyboardArrowDownRounded /> : <KeyboardArrowRightRounded />}
				</ListItemIcon>
				<ListItemText>
					{collection.name}
				</ListItemText>
			</ListItem>
			<Collapse in={open} timeout="auto" className="nested-list" unmountOnExit>
				<CollectionListLevel collections={collection.children} parentId={collection.collectionId.toString()}/>
			</Collapse>
		</Box>
	);
}

CollectionListItem.propTypes = {
	collection: PropTypes.object.isRequired
}

export default CollectionListItem;