import { useState } from "react";
import useActivate from "../../api/auth/useActivate";
import * as yup from "yup";
import { useFormik } from "formik";
import { Box, Divider, Grid, TextField } from "@material-ui/core";
import LoadingButton from "../inputs/LoadingButton/LoadingButton";
import { Alert } from "@material-ui/lab";
import { CheckRounded } from "@material-ui/icons";

function ActivateForm() {
	const [handleActivate, loading] = useActivate();
	const [errorMessage, setErrorMessage] = useState("");

	const handleSubmit = async (values) => {
		try {
			const activatedEmail = await handleActivate(values.activationToken);
			console.log(activatedEmail);
		} catch (error) {
			setErrorMessage(error.message);
		}
	}

	const validationSchema = yup.object({
		'activationToken': yup.string().uuid('Invalid token').required('Required')
	});

	const formik = useFormik({
		initialValues: {
			activationToken: ''
		},
		validationSchema: validationSchema,
		onSubmit: values => handleSubmit(values)
	})

	const errorAlert = (
		<Alert severity="error" onClose={() => setErrorMessage('')}>{errorMessage}</Alert>
	);

	return (
		<Box>
			<CheckRounded style={{fontSize: 60}} color="primary" />
			<Divider variant="middle"/>
			{!!errorMessage && errorAlert}
			<form autoComplete="off">
				<Grid container alignItems="flex-start" spacing={2}>
					<Grid item xs={12}>
						<TextField
							autoComplete="one-time-code"
							name="activationToken"
							id="activationToken"
							label="Activation Token"
							value={formik.values.activationToken}
							onChange={formik.handleChange}
							error={formik.touched.activationToken && !!formik.errors.activationToken}
							helperText={formik.touched.activationToken && formik.errors.activationToken}
							variant="outlined"
							fullWidth
						/>
					</Grid>
					<Grid item xs={12}>
						<LoadingButton isLoading={loading} onClick={e => formik.handleSubmit(e)} color="primary" variant="contained">Activate</LoadingButton>
					</Grid>
				</Grid>
			</form>
		</Box>
	);
}

export default ActivateForm;