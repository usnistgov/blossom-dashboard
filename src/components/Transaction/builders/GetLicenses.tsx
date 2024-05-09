import { TransactionBuilder } from "../builder";
import { TextInput} from '@mantine/core';
import { useEffect, useState } from "react";
import BuilderInfo from "./BuilderInfo";

const GetLicenses: TransactionBuilder = ({ setTransactionRequest }) => {
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
      setAccountError('Asset id must have a length > 1');
      valid = false;
    }

    if (valid) {
      setTransactionRequest({
        functionType: 'invoke',
        function: 'GetAsset',
        args: [account as string, assetId as string],
      });
    } else {
      setTransactionRequest(undefined);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assetId, account]);

  return <>
    <BuilderInfo
      description="List the licenses an account has for an asset"
      info="The requesting member must have a status of 'Authorized' or else an error will occur.
        A member can obtain a status of Authorized if the SAMS admin calls UpdateAccountStatus on the member's account."
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

export default GetLicenses;
