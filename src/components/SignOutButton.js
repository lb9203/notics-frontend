import { useLogout } from "../api/auth/useLogout";
import LoadingButton from "./LoadingButton";

function SignOutButton() {
	const [handleLogout, loading] = useLogout();

	return <LoadingButton isLoading={loading} variant="outline-danger" onClick={() => handleLogout()}>
		Sign Out
	</LoadingButton>
}

export default SignOutButton;