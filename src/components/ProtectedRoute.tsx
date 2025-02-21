import { Navigate } from "react-router-dom";
import { useMembership } from "@/contexts/MembershipContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredType?: "browser" | "club" | "admin";
}

const ProtectedRoute = ({
  children,
  requiredType = "browser",
}: ProtectedRouteProps) => {
  const { isAuthenticated, membershipType } = useMembership();

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (requiredType === "admin" && membershipType !== "admin") {
    return <Navigate to="/" replace />;
  }

  if (requiredType === "club" && membershipType !== "club") {
    return <Navigate to="/membership/pricing" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
