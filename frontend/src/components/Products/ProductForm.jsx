import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Box, Snackbar, Alert } from "@mui/material";
import InputField from "../ui/InputField";
import SubmitButton from "../ui/SubmitButton";
import productApi from "../../services/api/product";


export default function ProductForm({ product = {}, setOpen, mode = "create" }) {
  const [createProduct] = productApi.endpoints.createProduct.useMutation();
  const [updateProduct] = productApi.endpoints.updateProductById.useMutation();
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenError(false);
  };

  const initialValues = {
    name: product.name || "",
    type : product.type || "",
    price: product.price || 0,
    rating: product.rating || 0,
    warranty_years: product.warranty_years || 0,
    available: product.available || false,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    type: Yup.string().required("Type is required"),
    price: Yup.number()
      .min(0, "Price must be greater than 0")
      .required("Price is required"),
    rating: Yup.number()
      .min(0, "Rating must be at least 0")
      .max(5, "Rating cannot exceed 5")
      .required("Rating is required"),
    warranty_years: Yup.number()
      .min(0, "Warranty years must be at least 0")
      .required("Warranty is required"),
    available: Yup.boolean().required("Select availability"),
  });

  const handleFormSubmit = async (values) => {
    try {
      const formattedValues = { ...values };

      if (mode === "update") {
        // eslint-disable-next-line no-unused-vars
        const { _id, user, __v, ...dataToUpdate } = {
          ...product,
          ...formattedValues,
        };
        await updateProduct({ id: product._id, data: dataToUpdate }).unwrap();
      } else {
        await createProduct(formattedValues).unwrap();
      }
      setOpen(false);
    } catch (err) {
      console.error("Failed to submit product:", err);
      setErrorMessage(err?.data?.message || "Operation failed");
      setOpenError(true);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2, width: "100%" }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ values, handleChange }) => (
          <Form>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" , mt : 10 }}>
              <InputField label="Name" name="name" value={values.name} onChange={handleChange} />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />

              <InputField label="Type" name="type" value={values.type} onChange={handleChange} />
              <ErrorMessage name="type" component="div" className="text-red-500 text-sm mt-1" />

              <InputField label="Price" type="number" name="price" value={values.price} onChange={handleChange} />
              <ErrorMessage name="price" component="div" className="text-red-500 text-sm mt-1" />

              <InputField label="Rating" type="number" name="rating" value={values.rating} onChange={handleChange} />
              <ErrorMessage name="rating" component="div" className="text-red-500 text-sm mt-1" />

              <InputField label="Warranty Years" type="number" name="warranty_years" value={values.warranty_years} onChange={handleChange} />
              <ErrorMessage name="warranty_years" component="div" className="text-red-500 text-sm mt-1" />

              <InputField label="Available" type="select" name="available" value={values.available} onChange={handleChange} />
              <ErrorMessage name="available" component="div" className="text-red-500 text-sm mt-1" />

              <SubmitButton
                text={mode === "update" ? "Confirm Update" : "Create Product"}
                onClick={() => document.querySelector("form").dispatchEvent(
                  new Event("submit", { cancelable: true, bubbles: true })
                )}
              />
            </Box>
          </Form>
        )}
      </Formik>

      <Snackbar
        open={openError}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
