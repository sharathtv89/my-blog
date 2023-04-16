import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = ({buttonText}) => {
  const { loginWithRedirect } = useAuth0();
  if(!buttonText)
  buttonText = "Log In"

  return <button className="log-button" onClick={() => loginWithRedirect()}>{buttonText}</button>;
};

export default LoginButton;