import { useRef } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Paper, { PaperProps } from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Draggable from "react-draggable";

// Draggable Paper component for moving the modal
function PaperComponent(props: PaperProps) {
  const nodeRef = useRef<HTMLDivElement>(null);
  return (
    <Draggable
      nodeRef={nodeRef as React.RefObject<HTMLDivElement>}
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} ref={nodeRef} />
    </Draggable>
  );
}

export interface MeetingDialogProps {
  open: boolean;
  handleClose: () => void;
}

function MeetingDialog({ handleClose, open }: MeetingDialogProps) {
  return (
    <Dialog
      onClose={handleClose}
      open={open}
      PaperComponent={PaperComponent}
      slotProps={{
        paper: {
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            // TODO: CALL FUNCTION TO FETCH FROM DB (PASS FUNCTION AS PROPS?)
            // const formData = new FormData(event.currentTarget);
            // const formJson = Object.fromEntries((formData as any).entries());
            // const email = formJson.email;
            // console.log(email);
            handleClose();
          },
        },
      }}
    >
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        Add New Event To Calendar
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center" p={1}>
          <TextField
            label="Title"
            variant="outlined"
            margin="normal"
            fullWidth
            required
          />
          <TextField
            label="Description"
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <TextField
            label="Attendees"
            variant="outlined"
            helperText="(Comma-delimited)"
            margin="normal"
            fullWidth
            required
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Add Event</Button>
      </DialogActions>
    </Dialog>
  );
}

export default MeetingDialog;
