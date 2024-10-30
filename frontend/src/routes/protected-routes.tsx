import { VerifyUserQuery } from "@/services/queries";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes() {
  const { data: isAuthenticated } = VerifyUserQuery();

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  if (!isAuthenticated.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return <Outlet />;
}
