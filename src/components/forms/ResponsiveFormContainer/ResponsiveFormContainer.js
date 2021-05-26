import { Box, useMediaQuery, Paper } from "@material-ui/core";
import './ResponsiveFormContainer.scss';

/**
 * Container for forms styled as paper on non-mobile devices.
 *
 * @param rest
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
function ResponsiveFormContainer({ children, ...rest }) {
	const isMobile = useMediaQuery('(max-width:480px)')

	if (isMobile) {
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