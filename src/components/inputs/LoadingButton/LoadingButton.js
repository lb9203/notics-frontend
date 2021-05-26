import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types';
import './LoadingButton.scss';

function LoadingButton({ isLoading, children, ...rest }) {

	return (
		<div>
			<Button disabled={isLoading} {...rest} className='loading-button'>
				{children}
			</Button>
		</div>
	);
}

LoadingButton.propTypes = {
	isLoading: PropTypes.bool.isRequired
}

export default LoadingButton;