import { useEffect } from "react";
import { TransactionBuilder } from "../builder";
import BuilderInfo from "./BuilderInfo";

const GetAssets: TransactionBuilder = ({ setTransactionRequest }) => {
  useEffect(() => setTransactionRequest({
    functionType: 'invoke',
    function: 'GetAssets',
    args: [],
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), []);

  return <BuilderInfo
    description="Get a list of all available assets."
    info="The requesting member must have a status of 'Authorized' or else an error will occur.
      A member can obtain a status of Authorized if the SAMS admin calls UpdateAccountStatus on the member's account."
  />;
}

export default GetAssets;
