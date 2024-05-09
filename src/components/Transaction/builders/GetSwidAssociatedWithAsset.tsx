import { TransactionBuilder } from "../builder";
import { TextInput} from '@mantine/core';
import { useEffect, useState } from "react";
import BuilderInfo from "./BuilderInfo";

const GetSwidAssociatedWithAsset: TransactionBuilder = ({ setTransactionRequest }) => {
  const [assetId, setAssetId] = useState<string>();
  const [account, setAccount] = useState<string>();

  const [assetIdError, setAssetIdError] = useState<string>();
  const [accountError, setAccountError] = useState<string>();
  
  useEffect(() => {
    setAssetIdError(undefined);
    setAccountError(undefined);

    let valid = true;

    if (assetId === undefined || assetId.length < 1) {
      setAssetIdError('Asset id must have a length > 1');
      valid = false;
    }

    if (account === undefined || account.length < 1) {
      setAccountError('Account id must have a length > 1');
      valid = false;
    }

    if (valid) {
      setTransactionRequest({
        functionType: 'invoke',
        function: 'GetSwIDsAssociatedWithAsset',
        args: [account as string, assetId as string],
      });
    } else {
      setTransactionRequest(undefined);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assetId, account]);

  return <>
    <BuilderInfo
      description="Get the SwID Tags that have been reported and are associated with the given asset"
    />
    <TextInput
      label="Asset ID"
      onChange={(e) => setAssetId(e.target.value)}
      error={assetIdError}
      withAsterisk
    />
    <TextInput
      label="Account"
      onChange={(e) => setAccount(e.target.value)}
      error={accountError}
      withAsterisk
    />
  </>;
}

export default GetSwidAssociatedWithAsset;
