import Navbar from "react-bootstrap/Navbar";
import { ReactComponent as Logo } from '../assets/logo.svg';
import { useAuth } from "../hooks/useAuth";
import { Nav } from "react-bootstrap";
import SignOutButton from "./SignOutButton";
import SignInButton from "./SignInButton";

function NoticsNavbar() {
	const [sessionToken] = useAuth().useSessionToken;

	return (
		<Navbar bg="light">
			<Navbar.Brand href="/home"> Home </Navbar.Brand>
			<Nav className="ml-auto">
				{sessionToken === null && <SignInButton/>}
				{sessionToken !== null && <SignOutButton/>}
			</Nav>
		</Navbar>
	);
}

export default NoticsNavbar;