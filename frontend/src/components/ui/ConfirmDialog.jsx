import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

export default function ConfirmDialog({ open, onClose, title, children, actions }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: 2,
          minHeight: "200px",
        }}
      >
        {children}
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", gap: 2 }}>
        {actions}
      </DialogActions>
    </Dialog>
  );
}
