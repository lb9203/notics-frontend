import { useState } from "react";
import LoginForm from "./forms/LoginForm";
import RegisterForm from "./forms/RegisterForm";
import Button from "react-bootstrap/Button";

function AuthPage() {

	const [isRegistering, setRegistering] = useState(false);

	const toggleRegistering = () => {
		setRegistering(!isRegistering);
	}

	let toggleFormButton = <Button variant="outline-secondary" onClick={() => toggleRegistering()}>
		{isRegistering ? "Login instead" : "Register instead"}
	</Button>

	return (
		<div id="auth-form">
			{isRegistering ? <RegisterForm/> : <LoginForm/>}
			{toggleFormButton}
		</div>
	);
}

export default AuthPage;