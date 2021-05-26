import Button from "@material-ui/core/Button";
import { useAuth } from "../../hooks/useAuth";
import { useApolloClient } from "@apollo/client";
import useGetCollection from "../../api/collection/useGetCollection";

function HomePage() {
	const [sessionToken, saveSessionToken, clearSessionToken] = useAuth().useSessionToken;
	const [handleGetCollections, collectionsLoading, collections, collectionsErrors ] = useGetCollection()
	const client = useApolloClient();

	const handleClick = async () => {
		await handleGetCollections();
	}

	const showData = () => {
		console.log(collections);
		return 'data';
	}

	return (
		<div>
			<div>{collectionsLoading ? 'loading...' : 'data'}</div>
			<Button onClick={() => handleClick()}>collections</Button>
		</div>
	);
}

export default HomePage;