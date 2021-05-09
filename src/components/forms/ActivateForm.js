import Form from "react-bootstrap/Form";
import { useState } from "react";
import useActivate from "../../api/auth/useActivate";
import LoadingButton from "../LoadingButton";

function ActivateForm() {
	const [activationToken, setActivationToken] = useState('');
	const [handleActivate, loading] = useActivate();
	const [validated, setValidated] = useState(false);

	const handleSubmit = async (event) => {
		const form = event.currentTarget.form;

		if (form.checkValidity() === false) {
			setValidated(true);
			return;
		}

		try {
			const activatedEmail = await handleActivate(activationToken);
		} catch (error) {
			console.log(error);
		}
	}

	return <Form noValidate validated={validated}>
		<Form.Group controlId="formBasicToken">
			<Form.Label>Activation token</Form.Label>
			<Form.Control required type="text" onChange={e => setActivationToken(e.target.value)}/>
			<Form.Control.Feedback type="invalid">Please provide a valid activation token.</Form.Control.Feedback>
		</Form.Group>
		<LoadingButton isLoading={loading} variant="primary" onClick={e => handleSubmit(e)}>
			Submit
		</LoadingButton>
	</Form>;
}

export default ActivateForm;