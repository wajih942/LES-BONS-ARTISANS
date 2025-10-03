import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

export default function CardWrapper({ children, title }) {
  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: 400,       // max width for the card
        margin: '2rem auto', // center horizontally with vertical spacing
        borderRadius: 3,     // rounded corners (theme spacing)
        boxShadow: 3,        // shadow level
      }}
    >
      <CardContent sx={{ padding: 4 }}> {/* padding inside the card */}
        {title && (
          <Typography
            variant="h5"
            component="h2"
            align="center"
            sx={{ marginBottom: 2, fontWeight: 'bold' }}
          >
            {title}
          </Typography>
        )}
        {children}
      </CardContent>
    </Card>
  );
}
