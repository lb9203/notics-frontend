import { Drawer, SwipeableDrawer } from "@material-ui/core";
import useDeviceType from "../../../hooks/useDeviceType";

function ResponsiveDrawer({children, ...rest}) {
	const [isMobile, isTablet] = useDeviceType();

	if (isTablet) {
		return (
			<SwipeableDrawer className="responsive-drawer" {...rest}>
				{children}
			</SwipeableDrawer>
		);
	} else {
		return (
			<Drawer variant="permanent" {...rest} open>
				{children}
			</Drawer>
		);
	}
}

export default ResponsiveDrawer;