import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ProductDialog from "./ProductDialog";
import productApi from "../../services/api/product";

export default function ProductCard({ product }) {
  const [deleteProduct] = productApi.endpoints.deleteProductById.useMutation();
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({ ...product });

  const handleClick = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setUpdatedProduct({ ...product });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("eee", name, value);
    setUpdatedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const confirmDelete = async () => {
    try {
      await deleteProduct(product._id).unwrap(); // Call the mutation
      console.log("Deleted:", product._id);
      handleClose(); // Close the dialog after deletion
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return (
    <>
      {/* Card */}
      <Card
        sx={{
          maxWidth: 250,
          margin: "auto",
          boxShadow: 3,
          borderRadius: 3,
          p: 2,
          cursor: "pointer",
        }}
        onClick={handleClick}
      >
        <CardMedia
          component="img"
          height="150"
          image="https://i5.walmartimages.com/seo/Apple-iPhone-X-64GB-Unlocked-GSM-Phone-w-Dual-12MP-Camera-Space-Gray-B-Grade-Used_15c2b968-bb85-41a4-9292-b017f78fe797.a66ebbf32b6d53b6d6eb14c47434ac04.jpeg"
          alt={product.name}
        />
        <CardContent>
          <Typography variant="h6" gutterBottom noWrap>
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            Price: ${product.price.toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            Type: {product.type} {/* <-- Added product type */}
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            mt={1}
            mb={1}
            gap={0.5}
          >
            <StarIcon sx={{ color: "#FFD700", fontSize: 10 }} />
            <Typography variant="body2" component="span" noWrap>
              {product.rating}
            </Typography>
          </Box>
          <Typography variant="body2" noWrap>
            Warranty: {product.warranty_years} year(s)
          </Typography>
          <Chip
            label={product.available ? "Available" : "Out of Stock"}
            color={product.available ? "success" : "error"}
            size="small"
            sx={{ mt: 1 }}
          />
        </CardContent>
      </Card>

      {/* Dialog */}
      <ProductDialog
        open={open}
        setOpen={setOpen}
        action={action}
        product={product}
        updatedProduct={updatedProduct}
        onClose={handleClose}
        onChange={handleChange}
        onDelete={confirmDelete}
        setAction={setAction}
      />
    </>
  );
}
