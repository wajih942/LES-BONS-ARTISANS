// File: ui/AddButton.jsx
import React from "react";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function AddButton({ onClick }) {
  return (
    <Fab
      color="primary"
      aria-label="add"
      sx={{ position: "fixed", bottom: 30, right: 30 }}
      onClick={onClick}
    >
      <AddIcon />
    </Fab>
  );
}
