import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@mui/material";

export default function WarningDialog({ open, onConfirm, onCancel }) {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle sx={{ fontWeight: "bold", color: "red" }}>
        Warning!
      </DialogTitle>

      <DialogContent>
        <Typography>
          Changing these filters will reset your current quiz. Are you sure you
          want to continue?
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onCancel} color="inherit">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Yes, Reset
        </Button>
      </DialogActions>
    </Dialog>
  );
}
