import { Box, Paper } from "@material-ui/core";
import './ResponsiveFormContainer.scss';
import useDeviceType from "../../../hooks/useDeviceType";

/**
 * Container for forms styled as paper on non-mobile devices.
 *
 * @param rest
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
function ResponsiveFormContainer({ children, ...rest }) {
	const [isMobile, isTablet] = useDeviceType();

	if (isTablet) {
		return (
			//Outer box provides margin that inner box can't, because it needs auto margin.
			<Box margin="10px" justifySelf="center">
				<Box className="responsive-form-container" {...rest}>
					{children}
				</Box>
			</Box>
		);
	} else {
		return (
			<Box margin="10px" justifySelf="center">
				<Paper className="responsive-form-container" {...rest}>
					{children}
				</Paper>
			</Box>
		);
	}
}

export default ResponsiveFormContainer;