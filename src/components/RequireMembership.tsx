import React from "react";
import { useMembership } from "../contexts/MembershipContext";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

interface RequireMembershipProps {
  children: React.ReactNode;
  requiredType?: "browser" | "club";
}

const RequireMembership = ({
  children,
  requiredType = "club",
}: RequireMembershipProps) => {
  const { membershipType, isAuthenticated } = useMembership();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Sign in Required</h2>
        <p className="mb-4">Please sign in to access this content</p>
        <Button onClick={() => navigate("/signin")}>Sign In</Button>
      </div>
    );
  }

  if (
    (requiredType === "club" && membershipType !== "club") ||
    (requiredType === "browser" && membershipType === "none")
  ) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Membership Required</h2>
        <p className="mb-4">
          {requiredType === "club"
            ? "This content requires a club membership"
            : "This content requires at least a browser membership"}
        </p>
        <Button onClick={() => navigate("/membership/pricing")}>
          View Membership Options
        </Button>
      </div>
    );
  }

  return <>{children}</>;
};

export default RequireMembership;
