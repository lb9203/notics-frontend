import useLogin from "../api/auth/useLogin"
import { useState } from "react";
import { useAuth } from "../hooks/use-auth";

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { handleLogin, result, isLoading, error } = useLogin();
	const auth = useAuth();

	const handleSubmit = async (event) => {
		event.preventDefault();
		const sessionToken = await handleLogin(email, password);

		if (sessionToken){
			await auth.setSessionToken(sessionToken);
		} else {
			console.log(error);
		}
	}

	if (isLoading) {
		return <div>loading...</div>
	}

	return <form>
		<label>
			Email:
			<input
				type="text"
				name="email"
				value={email}
				onChange={event => setEmail(event.target.value)}
			/>
		</label>
		<label>
			Password:
			<input
				type="text"
				name="email"
				value={password}
				onChange={event => setPassword(event.target.value)}
			/>
		</label>
		<button value="Log in" onClick={(event => {handleSubmit(event)})}>Log in</button>
	</form>
}

export default Login;