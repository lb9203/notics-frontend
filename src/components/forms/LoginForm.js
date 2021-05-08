import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useLogin } from "../../api/auth/useLogin";
import { useAuth } from "../../hooks/useAuth";
import { Redirect } from "react-router-dom";

function LoginForm() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [handleLogin, isLoading] = useLogin();
	const [sessionToken, saveSessionToken] = useAuth().useSessionToken;

	const handleSubmit = async () => {
		try {
			const sessionToken = await handleLogin(email, password);
			saveSessionToken(sessionToken);
		} catch (error) {
			console.log(error);
		}
	}

	if (isLoading) {
		return <div>loading...</div>
	}

	if (sessionToken) {
		return <Redirect to="/home"/>
	}

	return <Form>
		<Form.Group controlId="formBasicEmail">
			<Form.Label>Email address</Form.Label>
			<Form.Control type="email" placeholder="Enter email" onChange={e => {
				setEmail(e.target.value);
			}}/>
			<Form.Text className="text-muted">
				We'll never share your email with anyone else.
			</Form.Text>
		</Form.Group>

		<Form.Group controlId="formBasicPassword">
			<Form.Label>Password</Form.Label>
			<Form.Control type="password" placeholder="Password" onChange={e => {
				setPassword(e.target.value);
			}}/>
		</Form.Group>
		<Button variant="primary" onClick={() => handleSubmit()}>
			Submit
		</Button>
	</Form>;
}

export default LoginForm;