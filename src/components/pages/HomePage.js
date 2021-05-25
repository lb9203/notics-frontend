import Button from "@material-ui/core/Button";
import { useAuth } from "../../hooks/useAuth";
import { gql } from "@apollo/client";
import useGetAccessToken from "../../api/auth/useGetAccessToken";


const ACCESS_TOKEN_QUERY = gql`
	query accessToken($sessionToken: String!) {
    	accessToken(sessionToken: $sessionToken)
    }
`;

function HomePage() {
	const [sessionToken, saveSessionToken, clearSessionToken] = useAuth().useSessionToken;
	const [get, loading] = useGetAccessToken();

	const handleToken = async () => {
		const a = get(sessionToken);
		console.log(a);
	}

	return (
		<div>
			<Button onClick={() => handleToken()}>token</Button>
		</div>
	);
}

export default HomePage;