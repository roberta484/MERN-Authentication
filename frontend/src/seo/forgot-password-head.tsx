import { Helmet } from "react-helmet-async";

export default function ForgotPasswordHead() {
  return (
    <Helmet>
      <title>Forgot Password | Mern Authentication</title>
      <meta
        name="description"
        content="Forgot your password? No worries. Follow our simple process to securely reset your password and regain access to your account."
      />
      <meta
        name="keywords"
        content="forgot password, password recovery, account access"
      />
    </Helmet>
  );
}
