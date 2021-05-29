import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import CreateCollectionForm from "../../../forms/CreateCollectionForm";

function CreateCollectionDialog({ parentId, open, setOpen }) {

	return (
		<Dialog className="create-collection-dialog" open={open} onClose={() => setOpen(false)} aria-labelledby="create-collection-dialog-title">
			<DialogTitle id="create-collection-dialog-title">Create a collection</DialogTitle>
			<DialogContent>
				<CreateCollectionForm parentId={parentId} onCancel={() => setOpen(false)}/>
			</DialogContent>
		</Dialog>
	);
}

export default CreateCollectionDialog;