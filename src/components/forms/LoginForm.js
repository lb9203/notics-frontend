import { Box, Divider, Grid, TextField, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import LoadingButton from "../LoadingButton";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from 'yup';
import useLogin from "../../api/auth/useLogin";
import { useAuth } from "../../hooks/useAuth";

function LoginForm() {
	const [handleLogin, loading] = useLogin();
	const [errorMessage, setErrorMessage] = useState('');
	const [sessionToken, saveSessionToken] = useAuth().useSessionToken;

	const handleSubmit = async (values) => {
		try {
			const sessionToken = await handleLogin(values.email, values.password);
			saveSessionToken(sessionToken);
		} catch (error) {
			setErrorMessage(error.message);
		}
	}

	const validationSchema = yup.object({
		email: yup.string().email("Invalid Email").required("Required"),
		password: yup.string().required("Required")
	});

	const formik = useFormik({
		initialValues: {
			email: '',
			password: ''
		},
		validationSchema: validationSchema,
		onSubmit: values => handleSubmit(values)
	})

	const errorAlert = (
		<Alert severity="error" onClose={() => setErrorMessage('')}>{errorMessage}</Alert>
	);

	return (
		<Box>
			<Typography variant="h4" color="textSecondary" align="center">Login</Typography>
			<Divider variant="middle"/>
			{!!errorMessage && errorAlert}
			<form autoComplete="off">
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
					<Grid item xs={12}>
						<TextField
							autoComplete="current-password"
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
					<Grid item xs={12}>
						<LoadingButton isLoading={loading} onClick={e => formik.handleSubmit(e)} color="primary" variant="contained">Login</LoadingButton>
					</Grid>
				</Grid>
			</form>
		</Box>
	);
}

export default LoginForm;