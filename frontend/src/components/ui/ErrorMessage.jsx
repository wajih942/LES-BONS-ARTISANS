import React from "react";
import { Box, Alert } from "@mui/material";

export default function ErrorMessage({ message = "Something went wrong." }) {
  return (
    <Box
      className="flex items-center justify-center min-h-screen"
      sx={{ width: "100%", textAlign: "center" }}
    >
      <Alert severity="error">{message}</Alert>
    </Box>
  );
}
