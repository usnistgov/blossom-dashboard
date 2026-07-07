import { useEffect } from "react";
import { TransactionBuilder } from "../builder";
import BuilderInfo from "./BuilderInfo";

// account:GetAccounts 
// without any parameters
const AccountGetAccounts: TransactionBuilder = ({ setTransactionRequest }) => {
  useEffect(() => setTransactionRequest({
    functionType: 'invoke',
    function: 'account:GetAccounts',
    args: [],
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), []);

  return <BuilderInfo description="Get public (name, mspid, status) info for all accounts"/>
}

export default AccountGetAccounts;
