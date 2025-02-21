import React from "react";
import { useNavigate } from "react-router-dom";
import SignInForm from "@/components/auth/SignInForm";

const SignIn = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <SignInForm onSuccess={() => navigate("/")} />
    </div>
  );
};

export default SignIn;
