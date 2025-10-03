import React from "react";
import { TextField, MenuItem } from "@mui/material";

export default function InputField({ label, name, type, value, onChange }) {
  if (type === "select") {
    return (
      <TextField
        select
        name={name}
        label={label}
        value={value} // always pass string
        onChange={onChange} // pass normal event
        variant="outlined"
        fullWidth
        sx={{ mt: 2 }}
      >
        <MenuItem value={true}>True</MenuItem>
        <MenuItem value={false}>False</MenuItem>
      </TextField>
    );
  }

  return (
    <TextField
      name={name}
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      variant="outlined"
      fullWidth
      sx={{ mt: 2 }}
    />
  );
}
