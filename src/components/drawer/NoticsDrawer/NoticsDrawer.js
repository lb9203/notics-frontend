import useDeviceType from "../../../hooks/useDeviceType";
import ResponsiveDrawer from "../ResponsiveDrawer/ResponsiveDrawer";
import { Box, Divider, IconButton } from "@material-ui/core";
import './NoticsDrawer.scss';
import { HomeRounded, MeetingRoomRounded } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import LoadingIconButton from "../../inputs/LoadingIconButton/LoadingIconButton";
import useLogout from "../../../api/auth/useLogout";
import useGetCollection from "../../../api/collection/useGetCollection";
import { cloneDeep } from "@apollo/client/utilities";
import CollectionList from "../list/CollectionList";
import { useEffect, useState } from "react";

const listToTree = (parentId, collections) => {
	const roots = collections.filter((collection) => {
		return collection.parentCollectionId === parentId;
	});

	roots.forEach((root) => {
		root.children = listToTree(root.collectionId, collections);
	});

	return roots;
}

function NoticsDrawer({ ...rest }) {
	const [isMobile, isTablet] = useDeviceType();
	const history = useHistory();

	const { loading, data, errors } = useGetCollection({ collectionId: null, parentCollectionId: null });
	const [formattedData, setFormattedData] = useState([]);
	const [handleLogout, logoutLoading] = useLogout(false);

	useEffect(() => {
		if (data) {
			const {collection: collections} = cloneDeep(data);
			setFormattedData(listToTree(null, collections));
		}
	}, [data])

	return (
		<ResponsiveDrawer {...rest} className="notics-drawer" classes={{ paper: 'notics-drawer-paper' }}>
			<Box className="control-container">
				<IconButton onClick={() => history.push('/home')} id="home-button"><HomeRounded/></IconButton>
				<LoadingIconButton isLoading={logoutLoading} onClick={() => handleLogout()} id="logout-button"><MeetingRoomRounded/></LoadingIconButton>
			</Box>
			<Divider variant="middle"/>
			<CollectionList  collectionData={formattedData}/>
		</ResponsiveDrawer>
	);
}

export default NoticsDrawer;