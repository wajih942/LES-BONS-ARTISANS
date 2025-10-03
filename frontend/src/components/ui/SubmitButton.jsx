import React from "react";
import { Button } from "@mui/material";

export default function SubmitButton({ text, onClick }) {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      fullWidth
      sx={{
        mt: 2, // Tailwind mt-4 equivalent
        py: 1.5, // Tailwind py-2
        borderRadius: '0.5rem', // Tailwind rounded-lg
        fontWeight: 600, // Tailwind font-semibold
      }}
    >
      {text}
    </Button>
  );
}
