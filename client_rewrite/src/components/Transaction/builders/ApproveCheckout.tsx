import { TransactionBuilder } from "../builder";
import { TextInput} from '@mantine/core';
import { useEffect, useState } from "react";
import BuilderInfo from "./BuilderInfo";

const ApproveCheckout: TransactionBuilder = ({ setTransactionRequest }) => {
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
        name: 'GetAsset',
        args: [],
        transient: {
          'asset_id': assetId as string,
          'account': account as string,
        }
      });
    } else {
      setTransactionRequest(undefined);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assetId, account]);

  return <>
    <BuilderInfo
      description="Request checkout of an asset"
      warn="Only the SAMS admin can approve checkout requests"
    />
    <TextInput
      label="Asset ID"
      description="ID of the asset to checkout"
      onChange={(e) => setAssetId(e.target.value)}
      error={assetIdError}
    />
    <TextInput
      label="Account"
      description="The account that requested the checkout"
      onChange={(e) => setAccount(e.target.value)}
      error={accountError}
    />
  </>;
}

export default ApproveCheckout;
