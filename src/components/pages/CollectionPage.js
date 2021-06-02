import {useRouteMatch} from 'react-router-dom';

function CollectionPage() {
	const match = useRouteMatch('/collection/:id');
	console.log(match)

	return (
		<div>{JSON.stringify(match)}</div>
	);
}

export default CollectionPage;