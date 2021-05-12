import Form from "react-bootstrap/Form";
import useRegister from "../../api/auth/useRegister";
import LoadingButton from "../LoadingButton";
import { Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Alert } from "react-bootstrap";

function RegisterForm() {
	const [handleRegister, loading] = useRegister();

	const [showError, setShowError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const errorAlert = (
		<Alert variant="danger" onClose={() => setShowError(false)} dismissible>
			{errorMessage}
		</Alert>
	);

	const handleSubmit = async (values) => {
		try {
			const confirmationEmail = await handleRegister(values.email, values.password, values.displayName);
			console.log(confirmationEmail);
		} catch (error) {
			setErrorMessage(error.message);
			setShowError(true);
		}
	}

	const validationSchema = Yup.object().shape({
		'email': Yup.string().email('Invalid email').required('Required'),
		'displayName': Yup.string().min(3, 'Too short').max(24, 'Too long').required('Required'),
		'password': Yup.string().min(8, 'Too short').max(64, 'Too long').required('Required'),
		'confirmPassword': Yup.string().oneOf([Yup.ref('password')], 'Passwords do not match').required('Required'),
	});

	return (
		<Formik
			validationSchema={validationSchema}
			initialValues={{ 'email': '', 'displayName': '', 'password': '', 'confirmPassword': '' }}
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
					<Form.Group controlId="email">
						<Form.Label>Email address</Form.Label>
						<Form.Control
							type="email"
							name="email"
							placeholder="Email"
							onChange={handleChange}
							isValid={touched.email && !errors.email}
							isInvalid={!!errors.email}
						/>
						<Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
					</Form.Group>

					<Form.Group controlId="displayName">
						<Form.Label>Display name</Form.Label>
						<Form.Control
							type="text"
							name="displayName"
							placeholder="Display name"
							onChange={handleChange}
							isValid={touched.displayName && !errors.displayName}
							isInvalid={!!errors.displayName}
						/>
						<Form.Control.Feedback type="invalid">{errors.displayName}</Form.Control.Feedback>
					</Form.Group>

					<Form.Group controlId="password">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							name="password"
							placeholder="Password"
							onChange={handleChange}
							isValid={touched.password && !errors.password}
							isInvalid={!!errors.password}
						/>
						<Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
					</Form.Group>

					<Form.Group controlId="password">
						<Form.Label>Confirm password</Form.Label>
						<Form.Control
							type="password"
							name="confirmPassword"
							placeholder="Confirm password"
							onChange={handleChange}
							isValid={touched.confirmPassword && !errors.confirmPassword}
							isInvalid={!!errors.confirmPassword}
						/>
						<Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
					</Form.Group>

					<LoadingButton isLoading={loading} variant="primary" onClick={handleSubmit}>
						Submit
					</LoadingButton>
				</Form>
			)}
		</Formik>
	);
}

export default RegisterForm;