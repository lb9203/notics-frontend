import { Box, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import CollectionListItem from "../CollectionListItem/CollectionListItem";
import propTypes from "prop-types";
import CreateCollectionDialog from "../CreateCollectionDialog/CreateCollectionDialog";
import { AddRounded } from "@material-ui/icons";
import { useState } from "react";
import "./CollectionListLevel.scss";

function CollectionListLevel({collections, parentId, ...rest}) {
	const [createDialogOpen, setCreateDialogOpen] = useState(false);

	return (
		<Box className="collection-list-level">
			<List {...rest}>
				{collections.map((value) => {
					return (<CollectionListItem collection={value}/>);
				})}
				<ListItem className="new-collection-button" button onClick={() => setCreateDialogOpen(true)} key={"create-with-parent-"+parentId}>
					<ListItemIcon><AddRounded /></ListItemIcon>
					<ListItemText>New</ListItemText>
				</ListItem>
			</List>
			<CreateCollectionDialog parentId={parentId} open={createDialogOpen} setOpen={setCreateDialogOpen} />
		</Box>

	);
}

CollectionListLevel.propTypes = {
	collections: propTypes.array.isRequired,
	parentId: propTypes.oneOfType([propTypes.number, propTypes.string]),
}

export default CollectionListLevel;