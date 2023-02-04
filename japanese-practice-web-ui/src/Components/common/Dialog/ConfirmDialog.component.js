import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";

const ConfirmDialog = ({title, content, onConfirm, openByDefault}, ref) => {
    const [open, setOpen] = useState(openByDefault || false);

    useImperativeHandle(ref, () => ({
        triggerOpen() {
            setOpen(true);
        }
    }));

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm();
        }
        setOpen(false);
    };

    return ( 
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{content}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleConfirm} variant="contained">OK</Button>
            </DialogActions>
        </Dialog>
    );
}
 
export default forwardRef(ConfirmDialog);