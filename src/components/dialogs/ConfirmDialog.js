import PropTypes from "prop-types";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";

function ConfirmDialog({open, setOpen, onConfirm, title, content,...rest}) {
    const handleConfirm = () => {
        setOpen(false);
        onConfirm();
    }

    const handleCancel = () => {
        setOpen(false);
    }

    return (
        <Dialog open={open} {...rest}>
            <DialogTitle>
                {title}
            </DialogTitle>
            {!!content &&
                <DialogContent>
                    <DialogContentText>
                        {content}
                    </DialogContentText>
                </DialogContent>
            }
            <DialogActions>
                <Button onClick={handleCancel} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleConfirm} color="primary">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}

ConfirmDialog.propTypes = {
    onConfirm: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
};

export default ConfirmDialog;