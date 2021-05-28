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

const listToTree = (roots, collections) => {
	if (roots.length === 0) {
		return [];
	}

	roots.forEach((root) => {
		let children = collections.filter((collection) => {
			return collection.parentCollectionId === root.collectionId;
		});

		root.children = listToTree(children, collections);
	})

	return roots;
}

function NoticsDrawer({ ...rest }) {
	const [isMobile, isTablet] = useDeviceType();
	const history = useHistory();

	const { loading, data, errors } = useGetCollection({ collectionId: null, parentCollectionId: null });
	const [handleLogout, logoutLoading] = useLogout(false);


	const formatData = () => {
		if (data) {
			let {collection: collections} = cloneDeep(data);

			let roots = collections.filter((collection) => {return collection.parentCollectionId === null});

			return listToTree(roots, collections);
		}

		return [];
	}

	return (
		<ResponsiveDrawer {...rest} className="notics-drawer" classes={{ paper: 'notics-drawer-paper' }}>
			<Box className="control-container">
				<IconButton onClick={() => history.push('/home')} id="home-button"><HomeRounded/></IconButton>
				<LoadingIconButton isLoading={logoutLoading} onClick={() => handleLogout()} id="logout-button"><MeetingRoomRounded/></LoadingIconButton>
			</Box>
			<Divider variant="middle"/>
			<CollectionList  collectionData={formatData()}/>
		</ResponsiveDrawer>
	);
}

export default NoticsDrawer;