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
import Alert from "@mui/material/Alert";

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
  const [pickerError, setPickerError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");

  const onDialogClose = () => {
    // Reset form on dialog close
    setStartDate(null);
    setEndDate(null);
    setPickerError("");
    setSubmitError("");
    handleClose();
  };

  const onStartDateChange = (newValue: moment.Moment | null) => {
    setStartDate(newValue);
    if (endDate && newValue && newValue.isAfter(endDate)) {
      // Disable submit on invalid date range
      setPickerError("Start date must be before end date");
    } else {
      setPickerError("");
    }
  };

  const onEndDateChange = (newValue: moment.Moment | null) => {
    setEndDate(newValue);
    if (startDate && newValue && newValue.isBefore(startDate)) {
      // Disable submit on invalid date range
      setPickerError("End date must be after start date");
    } else {
      setPickerError("");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setSubmitError("");

    try {
      const formData = new FormData(event.currentTarget);
      const formJson = Object.fromEntries((formData as any).entries());
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formJson.title,
          details: formJson.details,
          attendees: formJson.attendees
            .split(",")
            .map((item: string) => item.trim()),
          start: formJson.startDate,
          end: formJson.endDate,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setSubmitError(data.error || "Unknown error");
      } else {
        console.log("Event created:", data);
        onDialogClose();
      }
    } catch (err) {
      setSubmitError("Failed to create event.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      onClose={onDialogClose}
      open={open}
      PaperComponent={DraggablePaper}
      slotProps={{
        paper: {
          component: "form",
          onSubmit: handleSubmit,
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
            id="title"
            name="title"
          />
          <TextField
            label="Description"
            variant="outlined"
            margin="normal"
            fullWidth
            id="description"
            name="description"
          />
          <TextField
            label="Attendees"
            variant="outlined"
            helperText="Note: Comma-delimited"
            margin="normal"
            fullWidth
            required
            id="attendees"
            name="attendees"
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
                      error: !!pickerError,
                      helperText: pickerError,
                      required: true,
                      id: "startDate",
                      name: "startDate",
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
                      error: !!pickerError,
                      helperText: pickerError,
                      required: true,
                      id: "endDate",
                      name: "endDate",
                    },
                  }}
                />
              </PickerGridItem>
            </Grid>
          </Grid>
          {submitError && <Alert severity="error">{submitError}</Alert>}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDialogClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={!!pickerError || isLoading}>
          Add Event
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default MeetingDialog;
