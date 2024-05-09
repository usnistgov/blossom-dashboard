import { TransactionBuilder } from "../builder";
import { TextInput} from '@mantine/core';
import { useEffect, useState } from "react";
import BuilderInfo from "./BuilderInfo";

const ApproveAccount: TransactionBuilder = ({ setTransactionRequest }) => {
  const [account, setAccount] = useState<string>();
  const [accountError, setAccountError] = useState<string>();
  useEffect(() => {
    if (account) {
      setTransactionRequest({
        functionType: 'query',
        function: 'ApproveAccount',
        args: [account]
      });
      setAccountError(undefined);
    } else {
      setTransactionRequest(undefined);
      setAccountError('Account name must have a length > 1');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  return <>
    <BuilderInfo
      description="Approve an account request."
      info="This function will set the status of this account to “Pending: waiting for ATO”.
        From here, the System Owner of the account can upload an ATO using UploadATO using UploadATO and the SAMS admin can update the status to AUTHORIZED using UpdateAccountStatus"
      warn="Prerequisites: There must be an active request for an account using RequestAccount."
    />
    <TextInput
      label="Account Name"
      onChange={(e) => setAccount(e.target.value)}
      error={accountError}
      withAsterisk
    />
  </>;
}

export default ApproveAccount;
