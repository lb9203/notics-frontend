import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useLogin } from "../../api/auth/useLogin";
import { useAuth } from "../../hooks/useAuth";
import { Redirect } from "react-router-dom";
import LoadingButton from "../LoadingButton";
import { Alert } from "react-bootstrap";

function LoginForm() {
	const [validated, setValidated] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [handleLogin, loading] = useLogin();
	const [sessionToken, saveSessionToken] = useAuth().useSessionToken;


	const [showError, setShowError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const errorAlert = <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
		{errorMessage}
	</Alert>

	const handleSubmit = async (event) => {
		const form = event.currentTarget.form;

		if (form.checkValidity() === false) {
			setValidated(true);
			return;
		}

		try {
			const sessionToken = await handleLogin(email, password);
			saveSessionToken(sessionToken);
		} catch (error) {
			setErrorMessage(error.message);
			setShowError(true);
		}
	}

	if (sessionToken) {
		return <Redirect to="/home"/>
	}

	return <Form noValidate validated={validated}>
		{showError && errorAlert}
		<Form.Group controlId="formBasicEmail">
			<Form.Label>Email address</Form.Label>
			<Form.Control required type="email" placeholder="Email" onChange={e => {
				setEmail(e.target.value);
			}}/>
			<Form.Control.Feedback type="invalid">Please provide a valid email address.</Form.Control.Feedback>
		</Form.Group>

		<Form.Group controlId="formBasicPassword">
			<Form.Label>Password</Form.Label>
			<Form.Control required type="password" placeholder="Password" onChange={e => {
				setPassword(e.target.value);
			}}/>
			<Form.Control.Feedback type="invalid">Please provide a valid password.</Form.Control.Feedback>
		</Form.Group>
		<LoadingButton isLoading={loading} variant="primary" onClick={e => handleSubmit(e)}>
			Submit
		</LoadingButton>
	</Form>;
}

export default LoginForm;