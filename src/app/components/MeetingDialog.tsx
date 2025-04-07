import { useState } from "react";
import moment from "moment";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DraggablePaper from "./DraggablePaper";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Grid from "@mui/material/Grid";

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
  const [startDate, setStartDate] = useState<moment.Moment | null>(null);
  const [endDate, setEndDate] = useState<moment.Moment | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDialogClose = () => {
    // Clear pickers on dialog close
    setStartDate(null);
    setEndDate(null);
    setError(null);
    handleClose();
  };

  const onStartDateChange = (newValue: moment.Moment | null) => {
    setStartDate(newValue);
    if (endDate && newValue && newValue.isAfter(endDate)) {
      // Disable submit on invalid date range
      setError("Start date must be before end date");
    } else {
      setError(null);
    }
  };

  const onEndDateChange = (newValue: moment.Moment | null) => {
    setEndDate(newValue);
    if (startDate && newValue && newValue.isBefore(startDate)) {
      // Disable submit on invalid date range
      setError("End date must be after start date");
    } else {
      setError(null);
    }
  };

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
            const formData = new FormData(event.currentTarget);
            console.log(formData);
            const formJson = Object.fromEntries((formData as any).entries());
            console.log(formJson);
            onDialogClose();
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
                <DateTimePicker
                  label="Start Date"
                  value={startDate}
                  onChange={onStartDateChange}
                  slotProps={{
                    textField: {
                      error: !!error,
                      helperText: error,
                      required: true,
                    },
                  }}
                />
              </PickerGridItem>
            </Grid>
            <Grid size={6}>
              <PickerGridItem>
                <DateTimePicker
                  label="End Date"
                  value={endDate}
                  onChange={onEndDateChange}
                  slotProps={{
                    textField: {
                      error: !!error,
                      helperText: error,
                      required: true,
                    },
                  }}
                />
              </PickerGridItem>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDialogClose}>Cancel</Button>
        <Button type="submit" disabled={!!error}>
          Add Event
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default MeetingDialog;
