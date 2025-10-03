import React, { useState } from "react";
import { Grid, Container, Button } from "@mui/material";
import ProductCard from "../components/Products/ProductCard";
import productApi from "../services/api/product";
import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";
import AddButton from "../components/ui/AddButton";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import ProductForm from "../components/Products/ProductForm";
export default function MyProductsPage() {
  const {
    data: products,
    isLoading,
    isError,
  } = productApi.endpoints.getMyProducts.useQuery();
  const [openDialog, setOpenDialog] = useState(false);
  if (isLoading) return <Loader />;
  if (isError)
    return (
      <ErrorMessage message="Failed to load products. Please try again." />
    );

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
        <AddButton onClick={() => setOpenDialog(true)} />
        <ConfirmDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          title="Add New Product"
          actions={
            <>
              <Button variant="contained" onClick={() => setOpenDialog(false)}>
                Cancel
              </Button>
            </>
          }
        >
          <ProductForm
            setOpen={setOpenDialog}
            mode="create"
          />
        </ConfirmDialog>
      </Container>
    </div>
  );
}
