import { Helmet } from "react-helmet-async";

export default function SignInHead() {
  return (
    <Helmet>
      <title>Sign In | MERN Authentication</title>
      <meta
        name="description"
        content="Securely sign in to your account. Access your personalized dashboard and manage your profile with ease."
      />
      <meta
        name="keywords"
        content="sign in, login, account access, secure login, user authentication"
      />
    </Helmet>
  );
}
