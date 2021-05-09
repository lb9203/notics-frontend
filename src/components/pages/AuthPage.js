import { useState } from "react";
import LoginForm from "../forms/LoginForm";
import RegisterForm from "../forms/RegisterForm";
import Button from "react-bootstrap/Button";
import { CSSTransition, SwitchTransition } from "react-transition-group";

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
			<SwitchTransition>
				<CSSTransition key={isRegistering} addEndListener={(node, done) => node.addEventListener("transitionend", done, false)} classNames='fade'>
					<div>
						{isRegistering ? <RegisterForm/> : <LoginForm/>}
						{toggleFormButton}
					</div>
				</CSSTransition>
			</SwitchTransition>
		</div>
	);
}

export default AuthPage;