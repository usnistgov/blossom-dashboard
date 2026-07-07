import { TransactionBuilder } from "../builder";
import { TextInput} from '@mantine/core';
import { useEffect, useState } from "react";
import BuilderInfo from "./BuilderInfo";


// account:GetAccount 
// with one parameter: Account Name
const AccountGetAccount: TransactionBuilder = ({ setTransactionRequest }) => {
  const [account, setAccount] = useState<string>();
  const [accountError, setAccountError] = useState<string>();
  useEffect(() => {
    if (account) {
      setTransactionRequest({
        functionType: 'invoke',
        function: 'account:GetAccount',
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
    <BuilderInfo description="Get public (name, mspid, status) and private (ato, assets) info for an account"/>
    <TextInput
      label="Account Name"
      onChange={(e) => setAccount(e.target.value)}
      error={accountError}
      withAsterisk
    />
  </>;
}

export default AccountGetAccount;
