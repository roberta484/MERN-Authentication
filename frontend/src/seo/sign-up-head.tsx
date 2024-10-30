import { Helmet } from "react-helmet-async";

export default function SignUpHead() {
  return (
    <Helmet>
      <title>Create an Account | MERN Authentication</title>
      <meta
        name="description"
        content="Join our community today. Sign up for a free account and unlock exclusive features and personalized experiences."
      />
      <meta
        name="keywords"
        content="sign up, create account, register, join, new user registration"
      />
    </Helmet>
  );
}
