import Form from "react-bootstrap/Form";
import { useState } from "react";
import useRegister from "../../api/auth/useRegister";
import LoadingButton from "../LoadingButton";

function RegisterForm() {
	const [email, setEmail] = useState('');
	const [displayName, setDisplayName] = useState('');
	const [password, setPassword] = useState('');
	const [handleRegister, loading] = useRegister();
	const [validated, setValidated] = useState(false);

	const handleSubmit = async (event) => {
		const form = event.target.form;

		if (form.checkValidity() === false) {
			setValidated(true);
			return;
		}

		try {
			const confirmationEmail = await handleRegister(email, password, displayName);
			console.log(confirmationEmail);
		} catch (error) {
			console.log(error);
		}
	}

	return <Form noValidate validated={validated}>
		<Form.Group controlId="formBasicEmail">
			<Form.Label>Email address</Form.Label>
			<Form.Control required type="email" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
			<Form.Control.Feedback type="invalid">Please provide a valid email address.</Form.Control.Feedback>
		</Form.Group>

		<Form.Group controlId="formBasicDisplayName">
			<Form.Label>Display name</Form.Label>
			<Form.Control required type="text" placeholder="Display name" onChange={e => setDisplayName(e.target.value)}/>
			<Form.Control.Feedback type="invalid">Please provide a valid display name.</Form.Control.Feedback>
		</Form.Group>

		<Form.Group controlId="formBasicPassword">
			<Form.Label>Password</Form.Label>
			<Form.Control required type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
			<Form.Control.Feedback type="invalid">Please provide a valid password.</Form.Control.Feedback>
		</Form.Group>

		<LoadingButton isLoading={loading} variant="primary" onClick={e => handleSubmit(e)}>
			Submit
		</LoadingButton>
	</Form>;
}

export default RegisterForm;