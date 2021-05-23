import ActivateForm from "../forms/ActivateForm";
import { Box, Paper } from "@material-ui/core";

function ActivatePage() {
	return (
		<Box margin="10px" justifySelf="center">
			<Paper className="full-page-form">
				<ActivateForm/>
			</Paper>
		</Box>
	);
}

export default ActivatePage;