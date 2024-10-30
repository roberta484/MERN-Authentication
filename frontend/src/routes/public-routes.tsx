import { VerifyUserQuery } from "@/services/queries";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoutes() {
  const { data: isAuthenticated } = VerifyUserQuery();

  if (isAuthenticated && isAuthenticated?.isVerified) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
