import { TransactionBuilder } from "../builder";
import { NumberInput, TextInput} from '@mantine/core';
import { useEffect, useState } from "react";
import BuilderInfo from "./BuilderInfo";

const RequestCheckout: TransactionBuilder = ({ setTransactionRequest }) => {
  const [assetId, setAssetId] = useState<string>();
  const [amount, setAmount] = useState<number>();

  const [assetIdError, setAssetIdError] = useState<string>();
  const [amountError, setAmountError] = useState<string>();
  
  useEffect(() => {
    setAssetIdError(undefined);
    setAmountError(undefined);

    let valid = true;

    if (assetId === undefined || assetId.length < 1) {
      setAssetIdError('Asset id must have a length > 1');
      valid = false;
    }

    if (amount === undefined || amount < 1) {
      setAmountError('Amount must be > 0');
      valid = false;
    }

    if (valid) {
      setTransactionRequest({
        functionType: 'query',
        name: 'GetAsset',
        args: [],
        transient: {
          'checkout': {
            'asset_id': assetId as string,
            'amount': amount as number
          }
        }
      });
    } else {
      setTransactionRequest(undefined);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assetId, amount]);

  return <>
    <BuilderInfo
      description="Request checkout of an asset"
      info="The requesting member must have a status of 'Authorized' or else an error will occur.
        A member can obtain a status of Authorized if the SAMS admin calls UpdateAccountStatus on the member's account."
    />
    <TextInput
      label="Asset ID"
      description="ID of the asset to checkout"
      onChange={(e) => setAssetId(e.target.value)}
      error={assetIdError}
      withAsterisk
    />
    <NumberInput
      label="Amount"
      description="Quantity of licenses to checkout"
      onChange={(e) => setAmount(e)}
      error={amountError}
      withAsterisk
    />
  </>;
}

export default RequestCheckout;
