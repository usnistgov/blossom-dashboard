import React from "react";
import { buildLoginHref } from "api/auth";
import { Button } from "@mantine/core";

const LoginButton: React.FC = () => {
  return (
    <Button
      variant="default"
      onClick={() => {
        window.location.href = buildLoginHref();
      }}
    >
      Login
    </Button>
  );
};

export default LoginButton;
