import { Box, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import CollectionListItem from "../CollectionListItem/CollectionListItem";
import propTypes from "prop-types";
import CreateCollectionDialog from "../CreateCollectionDialog/CreateCollectionDialog";
import { AddRounded } from "@material-ui/icons";
import { useState } from "react";
import "./CollectionListLevel.scss";

function CollectionListLevel({collections, parentId, ...rest}) {
	const [dialogOpen, setDialogOpen] = useState(false);
	console.log(parentId);
	return (
		<Box className="collection-list-level">
			<List {...rest}>
				{collections.map((value) => {
					return (<CollectionListItem collection={value}/>);
				})}
				<ListItem className="new-collection-button" button onClick={() => setDialogOpen(true)} key={"create-with-parent-"+parentId}>
					<ListItemIcon><AddRounded /></ListItemIcon>
					<ListItemText>New</ListItemText>
				</ListItem>
			</List>
			<CreateCollectionDialog parentId={parentId} open={dialogOpen} setOpen={setDialogOpen} />
		</Box>

	);
}

CollectionListLevel.propTypes = {
	collections: propTypes.array.isRequired,
	parentId: propTypes.string
}

export default CollectionListLevel;