import React from "react";
import { Grid, Container, CircularProgress, Alert, Box } from "@mui/material";
import ProductCard from "../components/Products/ProductCard";
import productApi from "../services/api/product";

export default function ProductsGrid() {
  const {
    data: products,
    isLoading,
    isError
  } = productApi.endpoints.getAllProducts.useQuery();

  // Loading state
  if (isLoading) {
    return (
      <Box
        className="flex items-center justify-center min-h-screen"
        sx={{ textAlign: "center" }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Error state
  if (isError) {
    return (
      <Box
        className="flex items-center justify-center min-h-screen"
        sx={{ width: "100%", textAlign: "center" }}
      >
        <Alert severity="error">Failed to load products. Please try again.</Alert>
      </Box>
    );
  }

  // Success state
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-400">
      <Container sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {products?.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
