import React from "react";
import { Button } from "@mui/material";

export default function ActionButtons({ buttons }) {
  return (
    <>
      {buttons.map((btn, idx) => (
        <Button
          key={idx}
          variant="contained"
          color={btn.color || "primary"}
          onClick={btn.onClick}
        >
          {btn.label}
        </Button>
      ))}
    </>
  );
}
