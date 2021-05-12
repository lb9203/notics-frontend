import Form from "react-bootstrap/Form";
import { useState } from "react";
import useActivate from "../../api/auth/useActivate";
import LoadingButton from "../LoadingButton";
import * as Yup from "yup";
import { Formik } from "formik";
import { Alert } from "react-bootstrap";

function ActivateForm() {
	const [handleActivate, loading] = useActivate();

	const [showError, setShowError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const errorAlert = (
		<Alert variant="danger" onClose={() => setShowError(false)} dismissible>
			{errorMessage}
		</Alert>
	);

	const handleSubmit = async (values) => {
		try {
			const activatedEmail = await handleActivate(values.activationToken);
			console.log(activatedEmail);
		} catch (error) {
			setErrorMessage(error.message);
			setShowError(true);
		}
	}

	const validationSchema = Yup.object().shape({
		'activationToken': Yup.string().uuid('Invalid token').required('Required')
	})

	return (
		<Formik
			validationSchema={validationSchema}
			initialValues={{ 'activationToken': '' }}
			onSubmit={handleSubmit}
			validateOnChange={false}
			validateOnBlur={false}
		>
			{({
				  handleSubmit,
				  handleChange,
				  touched,
				  errors
			  }) => (
				<Form noValidate>
					{showError && errorAlert}
					<Form.Group controlId="token">
						<Form.Label>Activation token</Form.Label>
						<Form.Control
							type="text"
							name="activationToken"
							placeholder="Activation token"
							onChange={handleChange}
							isValid={touched.activationToken && !errors.activationToken}
							isInvalid={!!errors.activationToken}
						/>
						<Form.Control.Feedback type="invalid">{errors.activationToken}</Form.Control.Feedback>
					</Form.Group>
					<LoadingButton isLoading={loading} variant="primary" onClick={handleSubmit}>
						Submit
					</LoadingButton>
				</Form>
			)}
		</Formik>
	);
}

export default ActivateForm;