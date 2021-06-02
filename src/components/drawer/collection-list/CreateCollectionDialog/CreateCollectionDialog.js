import {Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button} from "@material-ui/core";
import useCreateCollection from "../../../../api/collection/useCreateCollection";
import * as yup from "yup";
import {useFormik} from "formik";
import LoadingButton from "../../../inputs/LoadingButton/LoadingButton";

function CreateCollectionDialog({parentId, open, setOpen}) {
    const [handleCreateCollection, loading] = useCreateCollection();

    const handleSubmit = async ({name, description}) => {
        try {
            await handleCreateCollection({
                name: name,
                description: description !== '' ? description : null,
                parentCollectionId: parentId
            });
        } catch (e) {
            console.log(e);
        }

        setOpen(false);
    }

    const handleCancel = () => {
        setOpen(false);
    }

    const validationSchema = yup.object({
        'name': yup.string().min(1, 'Must be at least 1 character long.').required('Required'),
        'description': yup.string(3, 'Must be at least 3 characters long.')
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            description: ''
        },
        validationSchema: validationSchema,
        onSubmit: values => handleSubmit(values)
    })

    return (
        <Dialog className="create-collection-dialog" open={open} onClose={() => setOpen(false)}
                aria-labelledby="create-collection-dialog-title">
            <DialogTitle id="create-collection-dialog-title">Create a collection</DialogTitle>
            <form autoComplete="off">
                <DialogContent dividers>
                    <TextField
                        name="name"
                        label="Name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && !!formik.errors.name}
                        helperText={formik.touched.name && formik.errors.name}
                        fullWidth
                    />
                    <TextField
                        name="description"
                        label="Description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={formik.touched.description && !!formik.errors.description}
                        helperText={formik.touched.description && formik.errors.description}
                        fullWidth
                        multiline
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary">Cancel</Button>
                    <LoadingButton isLoading={loading} onClick={e => formik.handleSubmit(e)} color="primary">Create</LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default CreateCollectionDialog;