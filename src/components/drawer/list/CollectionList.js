import { List, ListSubheader } from "@material-ui/core";
import CollectionListItem from "./CollectionListItem/CollectionListItem";
import propTypes from 'prop-types';

function CollectionList({ collectionData }) {
	return (
		<List subheader={(<ListSubheader>Collections</ListSubheader>)}>
			{collectionData.map(
				(value) => {
					return (<CollectionListItem key={value.collectionId} collectionData={value}/>)
				})}
		</List>
	);
}

CollectionList.propTypes = {
	collectionData: propTypes.arrayOf(propTypes.object).isRequired,

}

export default CollectionList;