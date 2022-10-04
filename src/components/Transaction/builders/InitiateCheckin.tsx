import { TransactionBuilder } from "../builder";
import { MultiSelect, TextInput} from '@mantine/core';
import { useEffect, useState } from "react";
import BuilderInfo from "./BuilderInfo";

const InitiateCheckin: TransactionBuilder = ({ setTransactionRequest }) => {
  const [assetId, setAssetId] = useState<string>();
  const [licenses, setLicenses] = useState<string[]>();

  const [assetIdError, setAssetIdError] = useState<string>();
  const [licenseError, setLicenseError] = useState<string>();

  const [multiSelectData, setMultiSelectData] = useState<{label: string, value: string}[]>([]);
  
  useEffect(() => {
    setAssetIdError(undefined);
    setLicenseError(undefined);

    let valid = true;

    if (assetId === undefined || assetId.length < 1) {
      setAssetIdError('Asset id must have a length > 1');
      valid = false;
    }

    if (licenses === undefined || licenses.length < 1) {
      setLicenseError('Account id must have a length > 1');
      valid = false;
    }

    if (valid) {
      setTransactionRequest({
        functionType: 'query',
        name: 'GetSwIDsAssociatedWithAsset',
        args: [],
        transient: {
          'checkin': {
            'asset_id': assetId as string,
            'licenses': licenses as string[]
          }
        }
      });
    } else {
      setTransactionRequest(undefined);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assetId, licenses]);

  return <>
    <BuilderInfo
      description="Starts the process of returning licenses that have been checked out."
    />
    <TextInput
      label="Asset ID"
      onChange={(e) => setAssetId(e.target.value)}
      error={assetIdError}
      withAsterisk
    />
    <MultiSelect
      label="Licenses"
      data={multiSelectData}
      searchable
      creatable
      getCreateLabel={(query) => `+ Create ${query}`}
      onCreate={(query) => {
        const item = { value: query, label: query };
        setMultiSelectData((current) => [...current, item]);
        return item;
      }}
      onChange={(e) => setLicenses(e)}
      error={licenseError}
      withAsterisk
    />
  </>;
}

export default InitiateCheckin;
