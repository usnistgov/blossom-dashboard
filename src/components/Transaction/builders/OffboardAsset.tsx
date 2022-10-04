import { TransactionBuilder } from "../builder";
import { TextInput} from '@mantine/core';
import { useEffect, useState } from "react";
import BuilderInfo from "./BuilderInfo";

const OffboardAsset: TransactionBuilder = ({ setTransactionRequest }) => {
  const [assetId, setAssetId] = useState<string>();
  const [assetIdError, setAssetIdError] = useState<string>();
  useEffect(() => {
    if (assetId) {
      setTransactionRequest({
        functionType: 'query',
        name: 'OffboardAsset',
        args: [assetId]
      });
      setAssetIdError(undefined);
    } else {
      setTransactionRequest(undefined);
      setAssetIdError('Asset ID must have a length > 1');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assetId]);

  return <>
    <BuilderInfo
      description="Allows to Remove(Offboard) [Asset] from the chain."
      info="This function can only be called by the SAMS admin."
      warn="Prerequisites: the [Asset] has to have first been created using OnboardAsset"
    />
    <TextInput
      label="Asset ID"
      onChange={(e) => setAssetId(e.target.value)}
      error={assetIdError}
      withAsterisk
    />
  </>;
}

export default OffboardAsset;
