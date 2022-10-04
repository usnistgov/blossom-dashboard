import React from "react";
import { Alert, Text } from "@mantine/core";
import { IconAlertCircle, IconInfoCircle } from "@tabler/icons";

type Params = {
  description: string;
  info?: string;
  warn?: string;
}

const BuilderInfo: React.FC<Params> = ({description, info, warn}) => {
  return <>
    <Text>{description}</Text>
    {info ? <Alert
      icon={<IconInfoCircle size={16} />}
      title="Information"
      color="blue"
      mx="xl"
    >
      {info}
    </Alert> : undefined}
    {warn ? <Alert
      icon={<IconAlertCircle size={16} />}
      title="Warning"
      color="yellow"
      mx="xl"
    >
      {warn}
    </Alert> : undefined}
  </>;
}

export default BuilderInfo;
