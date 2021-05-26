import { useState } from "react";
import LoginForm from "../forms/LoginForm";
import RegisterForm from "../forms/RegisterForm";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import ResponsiveFormContainer from "../forms/ResponsiveFormContainer/ResponsiveFormContainer";

function AuthPage() {
	const [isRegistering, setRegistering] = useState(false);
	const [sessionToken, saveSessionToken] = useAuth().useSessionToken;

	const toggleRegistering = () => {
		setRegistering(!isRegistering);
	}

	const toggleFormButton = <Button color="primary" onClick={() => toggleRegistering()}>
		{isRegistering ? "Login" : "Register"}
	</Button>

	if (sessionToken) {
		return <Redirect to="/home"/>
	}

	return (
		<ResponsiveFormContainer>
			{isRegistering ? <RegisterForm/> : <LoginForm/>}
			{toggleFormButton}
		</ResponsiveFormContainer>
	);
}

export default AuthPage;