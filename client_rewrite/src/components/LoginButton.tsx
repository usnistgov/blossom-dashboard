import React from "react";
import { buildLoginHref } from "api/auth"

const LoginButton: React.FC = () => {
  return <a href={buildLoginHref()}>Login</a>;
}

export default LoginButton;
