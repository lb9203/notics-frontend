import { Box, Divider, Grid, TextField, Typography } from "@material-ui/core";
import LoadingButton from "../inputs/LoadingButton/LoadingButton";
import { useFormik } from "formik";
import useRegister from "../../api/auth/useRegister";
import { Alert } from "@material-ui/lab";
import * as yup from 'yup'
import { useState } from "react";

function RegisterForm() {
	const [handleRegister, loading] = useRegister();
	const [errorMessage, setErrorMessage] = useState("");

	const handleSubmit = async (values) => {
		try {
			const confirmationEmail = await handleRegister(values.email, values.password, values.displayName);
			console.log(confirmationEmail);
		} catch (error) {
			setErrorMessage(error.message);
		}
	}

	const validationSchema = yup.object().shape({
		'email': yup.string().email('Invalid email').required('Required'),
		'displayName': yup.string().min(3, 'Too short').max(24, 'Too long').required('Required'),
		'password': yup.string().min(8, 'Too short').max(64, 'Too long').required('Required'),
		'confirmPassword': yup.string().oneOf([yup.ref('password')], 'Passwords do not match').required('Required'),
	});

	const formik = useFormik({
		initialValues: {
			email: '',
			displayName: '',
			password: '',
			confirmPassword: ''
		},
		validationSchema: validationSchema,
		onSubmit: values => handleSubmit(values)
	});

	const errorAlert = (
		<Alert severity="error" onClose={() => setErrorMessage('')}>{errorMessage}</Alert>
	);

	return (
		<Box>
			<Typography variant="h4" color="textSecondary" align="center">Register</Typography>
			<Divider variant="middle"/>
			{!!errorMessage && errorAlert}
			<form>
				<Grid container alignItems="flex-start" spacing={2}>
					<Grid item xs={12}>
						<TextField
							autoComplete="email"
							name="email"
							id="email"
							label="Email"
							type="email"
							value={formik.values.email}
							onChange={formik.handleChange}
							error={formik.touched.email && !!formik.errors.email}
							helperText={formik.touched.email && formik.errors.email}
							variant="outlined"
							fullWidth
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							autoComplete="new-password"
							name="password"
							id="password"
							label="Password"
							type="password"
							value={formik.values.password}
							onChange={formik.handleChange}
							error={formik.touched.password && !!formik.errors.password}
							helperText={formik.touched.password && formik.errors.password}
							variant="outlined"
							fullWidth
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							autoComplete="new-password"
							name="confirmPassword"
							id="confirmPassword"
							label="Confirm Password"
							type="password"
							value={formik.values.confirmPassword}
							onChange={formik.handleChange}
							error={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
							helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
							variant="outlined"
							fullWidth
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							autoComplete="nickname"
							name="displayName"
							id="displayName"
							label="Display Name"
							value={formik.values.displayName}
							onChange={formik.handleChange}
							error={formik.touched.displayName && !!formik.errors.displayName}
							helperText={formik.touched.displayName && formik.errors.displayName}
							variant="outlined"
							fullWidth
						/>
					</Grid>
					<Grid item xs={12}>
						<LoadingButton isLoading={loading} onClick={e => formik.handleSubmit(e)} color="primary" variant="contained">Register</LoadingButton>
					</Grid>
				</Grid>
			</form>
		</Box>
	);
}

export default RegisterForm;