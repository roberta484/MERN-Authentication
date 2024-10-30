import { Helmet } from "react-helmet-async";

export default function ResetPasswordHead() {
  return (
    <Helmet>
      <title>Reset Your Password | MERN Authentication</title>
      <meta
        name="description"
        content="Securely reset your password. Follow our easy steps to regain access to your account quickly and safely."
      />
      <meta
        name="keywords"
        content="reset password, forgot password, account recovery, password change"
      />
    </Helmet>
  );
}
