import {useRouteMatch} from 'react-router-dom';

function CollectionPage() {
	const match = useRouteMatch('/collection/:id');
	console.log(match)

	return (
		<div>123</div>
	);
}

export default CollectionPage;