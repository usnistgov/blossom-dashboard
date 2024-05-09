import { TransactionBuilder } from "../builder";
import { TextInput} from '@mantine/core';
import { useEffect, useState } from "react";
import BuilderInfo from "./BuilderInfo";

const ProcessCheckin: TransactionBuilder = ({ setTransactionRequest }) => {
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
        functionType: 'query',
        function: 'ProcessCheckin',
        args: [],
        transient: {
          'checkin': {
            'asset_id': assetId as string,
            'account': account as string,
          }
        }
      });
    } else {
      setTransactionRequest(undefined);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assetId, account]);

  return <>
    <BuilderInfo
      description="Process an existing request to checkin licenses by an account."
    />
    <TextInput
      label="Asset ID"
      description="ID of the asset to checkin"
      onChange={(e) => setAssetId(e.target.value)}
      error={assetIdError}
    />
    <TextInput
      label="Account"
      description="The account that initiated the checkin"
      onChange={(e) => setAccount(e.target.value)}
      error={accountError}
    />
  </>;
}

export default ProcessCheckin;
