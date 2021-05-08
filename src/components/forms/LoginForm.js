import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useLogin } from "../../api/auth/useLogin";
import { useAuth } from "../../hooks/useAuth";
import { Redirect } from "react-router-dom";
import LoadingButton from "../LoadingButton";

function LoginForm() {
	const [validated, setValidated] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [handleLogin, loading] = useLogin();
	const [sessionToken, saveSessionToken] = useAuth().useSessionToken;

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
			console.log(error);
		}
	}

	if (sessionToken) {
		return <Redirect to="/home"/>
	}

	return <Form noValidate validated={validated}>
		<Form.Group controlId="formBasicEmail">
			<Form.Label>Email address</Form.Label>
			<Form.Control required type="email" placeholder="Enter email" onChange={e => {
				setEmail(e.target.value);
			}}/>
			<Form.Control.Feedback type="invalid">Please provide a valid email address.</Form.Control.Feedback>
			<Form.Text className="text-muted">
				We'll never share your email with anyone else.
			</Form.Text>
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