import PropTypes from "prop-types";
import { IconButton } from "@material-ui/core";

function LoadingIconButton({ isLoading, children, ...rest }) {

	return (
		<div>
			<IconButton disabled={isLoading} {...rest} className='loading-icon-button'>
				{children}
			</IconButton>
		</div>
	);
}

LoadingIconButton.propTypes = {
	isLoading: PropTypes.bool.isRequired
}

export default LoadingIconButton;