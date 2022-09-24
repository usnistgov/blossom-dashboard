import { useEffect } from "react";
import { TransactionBuilder } from "../builder";
import { Text} from '@mantine/core';

const GetAccounts: TransactionBuilder = ({ setTransactionRequest }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setTransactionRequest({
    functionType: 'invoke',
    name: 'GetAccounts',
    args: [],
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), []);
  return <Text>
    Get public (name, mspid, status) info for all accounts
  </Text>;
}

export default GetAccounts;
