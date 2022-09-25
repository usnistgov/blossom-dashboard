import { TransactionBuilder } from "../builder";
import { MultiSelect, TextInput} from '@mantine/core';
import { useEffect, useState } from "react";
import BuilderInfo from "./BuilderInfo";
import { DatePicker } from "@mantine/dates";

const OnboardAsset: TransactionBuilder = ({ setTransactionRequest }) => {
  const [assetId, setAssetId] = useState<string>();
  const [assetName, setAssetName] = useState<string>();
  // Null due to a weird mantine decision
  const [onboardDate, setOnboardDate] = useState<Date | null>(null);
  const [expirationDate, setExpirationDate] = useState<Date | null>(null);
  const [licenses, setLicenses] = useState<string[]>();

  const [assetIdError, setAssetIdError] = useState<string>();
  const [assetNameError, setAssetNameError] = useState<string>();
  const [onboardDateError, setOnboardDateError] = useState<string>();
  const [expirationDateError, setExpirationDateError] = useState<string>();
  const [licenseError, setLicenseError] = useState<string>();

  const [multiSelectData, setMultiSelectData] = useState<{label: string, value: string}[]>([]);
  
  useEffect(() => {
    setAssetIdError(undefined);
    setAssetNameError(undefined);
    setOnboardDateError(undefined);
    setExpirationDateError(undefined);
    setLicenseError(undefined);

    let valid = true;

    if (assetId === undefined || assetId.length < 1) {
      setAssetIdError('Asset id must have a length > 1');
      valid = false;
    }

    if (assetName === undefined || assetName.length < 1) {
      setAssetNameError('Asset id must have a length > 1');
      valid = false;
    }

    if (onboardDate === null) {
      setOnboardDateError('Onboard date must be defined');
      valid = false;
    }

    if (expirationDate === null) {
      setExpirationDateError('Expiration date must be defined');
      valid = false;
    }

    if (expirationDate && onboardDate && expirationDate <= onboardDate) {
      setExpirationDateError('Expiration date must be after onboard date');
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
        args: [assetId as string, assetName as string, (onboardDate as Date).toISOString(), (expirationDate as Date).toISOString()],
        transient: {
          'asset': {
            'licenses': licenses as string[]
          }
        }
      });
    } else {
      setTransactionRequest(undefined);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assetId, assetName, onboardDate, expirationDate, licenses]);

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
    <TextInput
      label="Asset Name"
      onChange={(e) => setAssetName(e.target.value)}
      error={assetNameError}
      withAsterisk
    />
    <DatePicker
      label="Onboard Date"
      error={onboardDateError}
      onChange={setOnboardDate}
      withAsterisk
    />
    <DatePicker
      label="Expiration Date"
      error={expirationDateError}
      onChange={setExpirationDate}
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

export default OnboardAsset;
