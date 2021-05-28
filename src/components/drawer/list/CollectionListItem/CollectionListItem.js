import PropTypes from "prop-types";
import { Box, Collapse, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { useState } from "react";
import { KeyboardArrowDownRounded, KeyboardArrowRightRounded } from "@material-ui/icons";
import "./CollectionListItem.scss";

function CollectionListItem({ collectionData, ...rest}) {
	const [open, setOpen] = useState();

	const handleClick = () => {
		setOpen(!open);
	}

	return (
		<Box>
			<ListItem button onClick={handleClick} {...rest}>
				<ListItemIcon>
					{open ? <KeyboardArrowDownRounded /> : <KeyboardArrowRightRounded />}
				</ListItemIcon>
				<ListItemText>
					{collectionData.name}
				</ListItemText>
			</ListItem>
			<Collapse in={open} timeout="auto" className="nested-list" unmountOnExit>
				<List disablePadding>
					{collectionData.children.map((value) => {
						return <CollectionListItem key={value.collectionId} collectionData={value} />
					})}
				</List>
			</Collapse>
		</Box>
	);
}

CollectionListItem.propTypes = {
	collectionData: PropTypes.object.isRequired
}

export default CollectionListItem;