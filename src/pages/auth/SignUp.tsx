import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SignUpForm from "@/components/auth/SignUpForm";

const SignUp = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const plan = searchParams.get("plan") as "browser" | "club" | null;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <SignUpForm
        selectedPlan={plan || "browser"}
        onSuccess={() => navigate("/")}
      />
    </div>
  );
};

export default SignUp;
