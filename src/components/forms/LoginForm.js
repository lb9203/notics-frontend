import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useLogin } from "../../api/auth/useLogin";
import { useAuth } from "../../hooks/useAuth";
import { Redirect } from "react-router-dom";
import LoadingButton from "../LoadingButton";
import { Alert } from "react-bootstrap";
import * as Yup from "yup";
import { Formik } from 'formik';


function LoginForm() {
	const [handleLogin, loading] = useLogin();
	const [sessionToken, saveSessionToken] = useAuth().useSessionToken;

	const [showError, setShowError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const errorAlert = (
		<Alert variant="danger" onClose={() => setShowError(false)} dismissible>
			{errorMessage}
		</Alert>
	);

	const handleSubmit = async (values) => {
		try {
			const sessionToken = await handleLogin(values.email, values.password);
			saveSessionToken(sessionToken);
		} catch (error) {
			setErrorMessage(error.message);
			setShowError(true);
		}
	}

	if (sessionToken) {
		return <Redirect to="/home"/>
	}

	const validationSchema = Yup.object().shape({
		email: Yup.string().email('Invalid email').required('Required'),
		password: Yup.string().required('Required'),
	});

	return (
		<Formik
			validationSchema={validationSchema}
			initialValues={{ 'email': '', 'password': '' }}
			onSubmit={handleSubmit}
			validateOnBlur={false}
			validateOnChange={false}
		>
			{({
				  handleSubmit,
				  handleChange,
				  touched,
				  errors
			  }) => (
				<Form noValidate>
					{showError && errorAlert}
					<Form.Group>
						<Form.Label>Email address</Form.Label>
						<Form.Control
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							isValid={touched.email && !errors.email}
							isInvalid={!!errors.email}
						/>
						<Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
					</Form.Group>

					<Form.Group controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							isValid={touched.password && !errors.password}
							isInvalid={!!errors.password}
						/>
						<Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
					</Form.Group>
					<LoadingButton
						isLoading={loading}
						variant="primary"
						onClick={handleSubmit}

					>
						Submit
					</LoadingButton>
				</Form>
			)}
		</Formik>
	);
}

export default LoginForm;