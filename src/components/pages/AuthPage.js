import { useState } from "react";
import LoginForm from "../forms/LoginForm";
import RegisterForm from "../forms/RegisterForm";
import Button from "@material-ui/core/Button";
import { Box, Paper } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

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
		<Box margin="10px" justifySelf="center">
			<Paper className="full-page-form">
				{isRegistering ? <RegisterForm/> : <LoginForm/>}
				{toggleFormButton}
			</Paper>
		</Box>
	);
}

export default AuthPage;