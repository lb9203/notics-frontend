import { useMediaQuery } from "@material-ui/core";

function useDeviceType() {
	const isMobile = useMediaQuery('(max-width:480px)');
	const isTablet = useMediaQuery('(min-width:481px) and (max-width:768px)');

	return [isMobile, isTablet];
}

export default useDeviceType;