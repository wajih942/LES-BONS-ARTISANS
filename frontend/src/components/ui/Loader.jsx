import React from "react";
import { Box, CircularProgress } from "@mui/material";

export default function Loader() {
  return (
    <Box
      className="flex items-center justify-center min-h-screen"
      sx={{ textAlign: "center" }}
    >
      <CircularProgress />
    </Box>
  );
}
