import { useState } from "react";
import LoginForm from "../forms/LoginForm";
import RegisterForm from "../forms/RegisterForm";
import Button from "react-bootstrap/Button";

function AuthPage() {

	const [isRegistering, setRegistering] = useState(false);

	const toggleRegistering = () => {
		setRegistering(!isRegistering);
	}

	let toggleFormButton = <Button variant="link" onClick={() => toggleRegistering()}>
		{isRegistering ? "Login" : "Register"}
	</Button>

	return (
		<div id="auth-form" className="full-page-form">
			<div>
				{isRegistering ? <RegisterForm/> : <LoginForm/>}
				{toggleFormButton}
			</div>
		</div>
	);
}

export default AuthPage;