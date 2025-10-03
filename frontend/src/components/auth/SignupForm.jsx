import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Snackbar, Alert, Typography, Link } from "@mui/material";
import CardWrapper from "../ui/CardWrapper";
import SubmitButton from "../ui/SubmitButton";
import InputField from "../ui/InputField";
import authApi from "../../services/api/auth";
import { useNavigate } from "react-router-dom";
export default function SignupForm() {
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [authRequest] = authApi.endpoints.signUp.useMutation();
  const navigate = useNavigate();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenError(false);
  };

  const initialValues = { name: "", email: "", password: "", confirmPassword: "" };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{5,}$/,
        "Password must be at least 5 characters and include an uppercase, lowercase, number, and special character (@$!%*?&)"
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSignup = async(values) => {
    // Dummy signup validation
    try {
      // Call your authRequest mutation
      await authRequest({
        name : values.name,
        email: values.email, // or a real token if using social login
        password: values.password // assuming EMAIL type
      }).unwrap();

      navigate("/");
      // Redirect user or do something after login
    } catch (err) {
      console.error(err);
      setErrorMessage(err?.data?.message || "Login failed");
      setOpenError(true);
    }
  };

  return (
    <CardWrapper title="Sign Up">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSignup}
      >
        {({ values, handleChange }) => (
          <Form>
            <InputField
              label="Name"
              type="text"
              value={values.name}
              onChange={handleChange("name")}
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-sm mt-1 mb-2"
            />

            <InputField
              label="Email"
              type="email"
              value={values.email}
              onChange={handleChange("email")}
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm mt-1 mb-2"
            />

            <InputField
              label="Password"
              type="password"
              value={values.password}
              onChange={handleChange("password")}
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm mt-1 mb-2"
            />

            <InputField
              label="Confirm Password"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange("confirmPassword")}
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="text-red-500 text-sm mt-1 mb-2"
            />

            <SubmitButton
              text="Sign Up"
              onClick={() =>
                document
                  .querySelector("form")
                  .dispatchEvent(
                    new Event("submit", { cancelable: true, bubbles: true })
                  )
              }
            />
          </Form>
        )}
      </Formik>

      <Snackbar
        open={openError}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>

      <Typography variant="body2" align="center" sx={{ mt: 4 }}>
        Already have an account?{" "}
        <Link href="/login" underline="hover" color="primary">
          Login
        </Link>
      </Typography>
    </CardWrapper>
  );
}
