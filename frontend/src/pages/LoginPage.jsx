import React from "react";
import LoginForm from "../components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-400">
      <LoginForm />
    </div>
  );
}
