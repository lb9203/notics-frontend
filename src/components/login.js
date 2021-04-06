import useLogin from "../api/auth/useLogin"
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Redirect } from "react-router-dom";

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { handleLogin, isLoading } = useLogin();
	const [sessionToken, saveSessionToken] = useAuth().useSessionToken;

	const handleSubmit = async (event) => {
		event.preventDefault();

		try{
			const sessionToken = await handleLogin(email, password);
			saveSessionToken(sessionToken);
		} catch (error) {
			console.log(error);
		}
	}

	if (isLoading) {
		return <div>loading...</div>
	}

	if (sessionToken){
		return <Redirect to="/home"/>
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