import useDeviceType from "../../../hooks/useDeviceType";
import ResponsiveDrawer from "../ResponsiveDrawer/ResponsiveDrawer";
import { Button, List, ListItem } from "@material-ui/core";
import './NoticsDrawer.scss';

function NoticsDrawer({...rest}) {
	const [isMobile, isTablet] = useDeviceType();

	const componentName = (isMobile ? 'Swipeable' : '')+'Drawer';

	return (
		<ResponsiveDrawer {...rest} className="notics-drawer" classes={{paper: 'notics-drawer-paper'}}>
			<List>
				<ListItem><Button>1</Button></ListItem>
				<ListItem><Button>2</Button></ListItem>
				<ListItem><Button>3</Button></ListItem>
			</List>
		</ResponsiveDrawer>
	);
}

export default NoticsDrawer;