import { TransactionBuilder } from "../builder";
import { TextInput} from '@mantine/core';
import { useEffect, useState } from "react";
import BuilderInfo from "./BuilderInfo";

const GetAsset: TransactionBuilder = ({ setTransactionRequest }) => {
  const [assetId, setAssetId] = useState<string>();
  const [assetIdError, setAssetIdError] = useState<string>();
  useEffect(() => {
    if (assetId) {
      setTransactionRequest({
        functionType: 'invoke',
        function: 'GetAsset',
        args: [assetId]
      });
      setAssetIdError(undefined);
    } else {
      setTransactionRequest(undefined);
      setAssetIdError('Asset id must have a length > 1');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assetId]);

  return <>
    <BuilderInfo
      description="Get detailed info about an asset, including licenses"
      info="The requesting member must have a status of 'Authorized' or else an error will occur.
        A member can obtain a status of Authorized if the SAMS admin calls UpdateAccountStatus on the member's account."
    />
    <TextInput
      label="Asset ID"
      onChange={(e) => setAssetId(e.target.value)}
      error={assetIdError}
      withAsterisk
    />
  </>;
}

export default GetAsset;
