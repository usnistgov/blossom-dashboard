import React from "react";
import { buildLoginHref } from "api/auth";
import { Button } from "@mantine/core";
import { IconKey, IconKeyOff } from '@tabler/icons-react';

//
const LoginButton: React.FC = () => {
  return (
    <Button
      leftIcon={<IconKey size="1rem" color="green"/>}
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
