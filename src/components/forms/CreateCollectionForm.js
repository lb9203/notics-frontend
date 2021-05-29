import useCreateCollection from "../../api/collection/useCreateCollection";
import * as yup from "yup";
import { useFormik } from "formik";
import { Box, Grid, TextField } from "@material-ui/core";
import LoadingButton from "../inputs/LoadingButton/LoadingButton";

function CreateCollectionForm({ parentId = null, onCancel }) {
	const [handleCreateCollection, loading] = useCreateCollection();

	const handleSubmit = async ({ name, description }) => {
		try {
			await handleCreateCollection({
				name: name,
				description: description !== '' ? description : null,
				parentCollectionId: parentId !== null ? parentId.toString() : null
			});
		} catch (e) {
			console.log(e);
		}

		if (onCancel) {
			onCancel();
		}
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
		<Box>
			<form autoComplete="off">
				<Grid container alignItems="flex-start" spacing={2}>
					<Grid item xs={12}>
						<TextField
							name="name"
							label="Name"
							value={formik.values.name}
							onChange={formik.handleChange}
							error={formik.touched.name && !!formik.errors.name}
							helperText={formik.touched.name && formik.errors.name}
							fullWidth
						/>
					</Grid>
					<Grid item xs={12}>
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
					</Grid>
					<Grid item xs={12}>
						<LoadingButton isLoading={loading} onClick={e => formik.handleSubmit(e)} color="primary" variant="contained">Create</LoadingButton>
					</Grid>
				</Grid>
			</form>
		</Box>
	);
}

export default CreateCollectionForm;