import React from "react";
import { Alert, Text } from "@mantine/core";
import { IconAlertCircle, IconInfoCircle } from "@tabler/icons-react";

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
/*
 ╔  dac4@PN132649  3.11  ~/di2run/dio-src   jk-i651-entity-types-cleanup   Mon Aug 11 ▷
 ╚▷ @10:04:19  git rebase dev
warning: skipped previously applied commit c46063ae

 ╔  dac4@PN132649  3.11  ~/di2run/dio-src   jk-i651-entity-types-cleanup   Mon Aug 11 ▷
 ╚▷ @10:04:42  git pull --all
warning: skipped previously applied commit f53daecf
warning: skipped previously applied commit 11f3b0a3
warning: skipped previously applied commit ee75880d
warning: skipped previously applied commit 2c8bb9c5
warning: skipped previously applied commit c35246ed
warning: skipped previously applied commit b6e7a5e7
warning: skipped previously applied commit 86f4094b
warning: skipped previously applied commit 325ab886
warning: skipped previously applied commit 0dae7bfe
warning: skipped previously applied commit 5db794e3
warning: skipped previously applied commit 8b6bd16a

*/