import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Snackbar, Alert, Typography, Link } from "@mui/material";
import CardWrapper from "../ui/CardWrapper";
import SubmitButton from "../ui/SubmitButton";
import InputField from "../ui/InputField";
import authApi from "../../services/api/auth";
import { useNavigate } from "react-router-dom";
export default function LoginForm() {
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [authRequest] = authApi.endpoints.signIn.useMutation();
  const navigate = useNavigate();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenError(false);
  };

  const initialValues = { email: "", password: "" };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleLogin = async (values) => {
    // // Dummy login validation
    // if (values.email !== "test@example.com" || values.password !== "123456") {
    //   setErrorMessage("Invalid email or password");
    //   setOpenError(true);
    //   return;
    // }

    // console.log("Login successful!", values);
    console.log("values",values)
    try {
      // Call your authRequest mutation
      await authRequest({
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
    <CardWrapper title="Login">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ values, handleChange }) => (
          <Form>
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

            <SubmitButton
              text="Login"
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
        Don’t have an account?{" "}
        <Link href="/signup" underline="hover" color="primary">
          Sign up
        </Link>
      </Typography>
    </CardWrapper>
  );
}
