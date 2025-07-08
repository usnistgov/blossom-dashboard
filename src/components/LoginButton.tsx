import React from "react";
import { buildLoginHref } from "api/auth";
import { Button } from "@mantine/core";
import { IconKey, IconLogin } from '@tabler/icons-react';

//
const LoginButton: React.FC = () => {
  return (
    <Button
      leftIcon={<IconLogin size="1rem" color="green"/>}
      variant="default"
      onClick={() => {
        console.log("Before window.location.href going to Cognito");
        window.location.href = buildLoginHref();
        console.log("After window.location.href going to Cognito");
      }}
    >
      Login
    </Button>
  );
};

export default LoginButton;
