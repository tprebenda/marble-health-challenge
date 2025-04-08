import { useEffect, useState } from "react";
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
import { CalendarEventEdit, CalendarEventResponse } from "../interfaces";

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

interface EventDialogProps {
  open: boolean;
  handleClose: () => void;
  onSuccess: () => void;
  initialEvent?: CalendarEventResponse | null;
}

// Dialog for adding/editing/deleting events, complete with texfields and datetime pickers (with validation)
function EventDialog({
  open,
  handleClose,
  onSuccess,
  initialEvent,
}: EventDialogProps) {
  const [form, setForm] = useState<CalendarEventEdit>({
    title: "",
    details: "",
    attendees: "",
    start: null,
    end: null,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pickerError, setPickerError] = useState<string>("");
  const [submitError, setSubmitError] = useState<string>("");

  // Load pre-existing event if editing from calendar
  useEffect(() => {
    if (initialEvent) {
      setForm({
        ...initialEvent,
        attendees: initialEvent.attendees.join(", "),
        start: moment(initialEvent.start),
        end: moment(initialEvent.end),
      });
    } else {
      setForm({
        title: "",
        details: "",
        attendees: "",
        start: null,
        end: null,
      });
    }
  }, [initialEvent]);

  // Reset form on dialog close
  const onDialogClose = () => {
    handleClose();
    setForm({
      title: "",
      details: "",
      attendees: "",
      start: null,
      end: null,
    });
    setPickerError("");
    setSubmitError("");
  };

  // Text fields
  const onTextfieldChange =
    (field: keyof CalendarEventEdit) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [field]: e.target.value });
    };

  // Start date
  const onStartDateChange = (newValue: moment.Moment | null) => {
    setForm({
      ...form,
      start: newValue,
    });
    if (form.end && newValue && newValue.isAfter(form.end)) {
      // Disable submit on invalid date range
      setPickerError("Start date must be before end date");
    } else {
      setPickerError("");
    }
  };

  // End date
  const onEndDateChange = (newValue: moment.Moment | null) => {
    setForm({
      ...form,
      end: newValue,
    });
    if (form.start && newValue && newValue.isBefore(form.start)) {
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
      // Edit existing event or post new one
      const method = form.id ? "PUT" : "POST";
      const endpoint = form.id ? `/api/events/${form.id}` : "/api/events";

      const response = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: form.title,
          details: form.details,
          attendees: form.attendees
            .split(",")
            .map((item: string) => item.trim()),
          start: form.start!.toDate(),
          end: form.end!.toDate(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setSubmitError(data.error || "Unknown error");
      } else {
        console.log("Event created/updated:", data);
        // Refetch events to show newly created event on calendar
        onSuccess();
        onDialogClose();
      }
    } catch (err) {
      setSubmitError("Failed to create/update event.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    // Only process delete if editing existing event, and user confirms
    if (!form.id || !confirm("Are you sure you want to delete this event?")) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/events/${form.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        setSubmitError(data.error || "Unknown error");
      }
      // Refresh events following delete
      onSuccess();
      handleClose();
    } catch (err) {
      setSubmitError("Failed to delete event.");
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
        {form.id ? "Edit Existing Event" : "Add New Event To Calendar"}
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center" p={1}>
          <TextField
            label="Title"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            value={form.title}
            onChange={onTextfieldChange("title")}
          />
          <TextField
            label="Details"
            variant="outlined"
            margin="normal"
            fullWidth
            value={form.details || ""}
            onChange={onTextfieldChange("details")}
          />
          <TextField
            label="Attendees"
            variant="outlined"
            helperText="Note: Comma-delimited"
            margin="normal"
            fullWidth
            required
            value={form.attendees}
            onChange={onTextfieldChange("attendees")}
          />
          <Grid container spacing={2} mt={2}>
            <Grid size={6}>
              <PickerGridItem>
                <DateTimePicker
                  label="Start Date"
                  value={form.start}
                  onChange={onStartDateChange}
                  slotProps={{
                    textField: {
                      error: !!pickerError,
                      helperText: pickerError,
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
                  value={form.end}
                  onChange={onEndDateChange}
                  slotProps={{
                    textField: {
                      error: !!pickerError,
                      helperText: pickerError,
                      required: true,
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
        {form.id && (
          <Button onClick={handleDelete} color="error" disabled={isLoading}>
            Delete
          </Button>
        )}
        <Button onClick={onDialogClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={!!pickerError || isLoading}>
          {form.id ? "Edit" : "Create"} Event
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EventDialog;
