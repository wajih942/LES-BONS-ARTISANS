import React from "react";
import { Grid, Container } from "@mui/material";
import ProductCard from "../components/Products/ProductCard";
import productApi from "../services/api/product";
import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";

export default function ProductsPage() {
  const {
    data: products,
    isLoading,
    isError
  } = productApi.endpoints.getAllProducts.useQuery();

  if (isLoading) return <Loader />;
  if (isError) return <ErrorMessage message="Failed to load products. Please try again." />;

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
