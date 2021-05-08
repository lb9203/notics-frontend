import { useLogout } from "../api/auth/useLogout";
import Button from "react-bootstrap/Button";

function SignOutButton() {
	const [handleLogout, loading] = useLogout();

	return <Button variant="outline-danger" onClick={() => {
		handleLogout();
	}}>{loading ? 'loading...' : 'Sign out'}</Button>
}

export default SignOutButton;