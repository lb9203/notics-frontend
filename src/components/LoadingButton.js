import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import PropTypes from 'prop-types';

function LoadingButton({isLoading, children, ...rest }) {

	return <Button disabled={isLoading} {...rest}>
		{isLoading ? <Spinner
			as="span"
			animation="border"
			size="sm"
			role="status"
			aria-hidden="true"
		/> : children}
	</Button>
}

LoadingButton.propTypes = {
	...Button.propTypes,
	isLoading: PropTypes.bool.isRequired
}

export default LoadingButton;