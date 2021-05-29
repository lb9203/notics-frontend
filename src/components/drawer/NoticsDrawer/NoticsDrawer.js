import useDeviceType from "../../../hooks/useDeviceType";
import ResponsiveDrawer from "../ResponsiveDrawer/ResponsiveDrawer";
import { Box, Divider, IconButton } from "@material-ui/core";
import './NoticsDrawer.scss';
import { HomeRounded, MeetingRoomRounded } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import LoadingIconButton from "../../inputs/LoadingIconButton/LoadingIconButton";
import useLogout from "../../../api/auth/useLogout";
import CollectionList from "../collection-list/CollectionList/CollectionList";

function NoticsDrawer({ ...rest }) {
	const [isMobile, isTablet] = useDeviceType();
	const history = useHistory();

	const [handleLogout, logoutLoading] = useLogout(false);

	return (
		<ResponsiveDrawer {...rest} className="notics-drawer" classes={{ paper: 'notics-drawer-paper' }}>
			<Box className="control-container">
				<IconButton onClick={() => history.push('/home')} id="home-button"><HomeRounded/></IconButton>
				<LoadingIconButton isLoading={logoutLoading} onClick={() => handleLogout()} id="logout-button"><MeetingRoomRounded/></LoadingIconButton>
			</Box>
			<Divider variant="middle"/>
			<CollectionList />
		</ResponsiveDrawer>
	);
}

export default NoticsDrawer;