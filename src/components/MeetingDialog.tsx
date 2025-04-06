import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Paper, { PaperProps } from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import DraggablePaper from "./DraggablePaper";

// Styled Paper element to hold Date Pickers in MUI grid component
const PickerGridItem = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

interface MeetingDialogProps {
  open: boolean;
  handleClose: () => void;
}

function MeetingDialog({ handleClose, open }: MeetingDialogProps) {
  return (
    <Dialog
      onClose={handleClose}
      open={open}
      PaperComponent={DraggablePaper}
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
            helperText="Note: Comma-delimited"
            margin="normal"
            fullWidth
            required
          />
          <Grid container spacing={2} mt={2}>
            <Grid size={6}>
              <PickerGridItem>
                <DateTimePicker label="Start Date" />
              </PickerGridItem>
            </Grid>
            <Grid size={6}>
              <PickerGridItem>
                <DateTimePicker label="Start Date" />
              </PickerGridItem>
            </Grid>
          </Grid>
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
