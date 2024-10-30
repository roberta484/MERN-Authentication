import { Helmet } from "react-helmet-async";

export default function VerifyEmailHead() {
  return (
    <Helmet>
      <title>Verify Your Email | MERN Authentication</title>
      <meta
        name="description"
        content="Complete your account setup by verifying your email address. Ensure secure access and receive important notifications."
      />
      <meta
        name="keywords"
        content="verify email, email confirmation, account activation, email verification"
      />
    </Helmet>
  );
}
