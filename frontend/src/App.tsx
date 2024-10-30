import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingSpinner from "./components/common/loading-spinner";
import ProtectedRoutes from "./routes/protected-routes";
import PublicRoutes from "./routes/public-routes";
import { VerifyUserQuery } from "./services/queries";

const SignInPage = lazy(() => import("./pages/sign-in-page"));
const SignUpPage = lazy(() => import("./pages/sign-up-page"));
const ForgotPasswordPage = lazy(() => import("./pages/forgot-password-page"));
const ResetPasswordPage = lazy(() => import("./pages/reset-password-page"));
const VerifyEmailPage = lazy(() => import("./pages/verify-email-page"));
const DashboardPage = lazy(() => import("./pages/dashboard-page"));

export default function App() {
  const { isLoading } = VerifyUserQuery();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<DashboardPage />} />
        </Route>
        <Route element={<PublicRoutes />}>
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/reset-password/:token"
            element={<ResetPasswordPage />}
          />
        </Route>
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
