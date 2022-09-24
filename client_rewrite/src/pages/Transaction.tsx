import { TransactionRequest } from "api";
import { builders, TransactionSelect } from "components";

export default function Transaction() {
  const onSubmit = async (transactionRequest: TransactionRequest) => {
    console.log(transactionRequest);
  }

  return <>
    <TransactionSelect
      transactionBuilders={builders}
      onSubmit={onSubmit}
    />
  </>;
}
