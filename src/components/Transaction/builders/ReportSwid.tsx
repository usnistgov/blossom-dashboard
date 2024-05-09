import { TransactionBuilder } from "../builder";
import { Textarea, TextInput} from '@mantine/core';
import { useEffect, useState } from "react";
import BuilderInfo from "./BuilderInfo";

const ReportSwid: TransactionBuilder = ({ setTransactionRequest }) => {
  const [primaryTag, setPrimaryTag] = useState<string>();
  const [assetId, setAssetId] = useState<string>();
  const [license, setLicense] = useState<string>();
  const [xml, setXml] = useState<string>();

  const [primaryTagError, setPrimaryTagError] = useState<string>();
  const [assetIdError, setAssetIdError] = useState<string>();
  const [licenseError, setLicenseError] = useState<string>();
  const [xmlError, setXmlError] = useState<string>();
  
  useEffect(() => {
    setPrimaryTagError(undefined);
    setAssetIdError(undefined);
    setLicenseError(undefined);
    setXmlError(undefined);

    let valid = true;

    if (primaryTag === undefined || primaryTag.length < 1) {
      setPrimaryTagError('Primary tag must have a length > 1');
      valid = false;
    }

    if (assetId === undefined || assetId.length < 1) {
      setAssetIdError('Asset id must have a length > 1');
      valid = false;
    }

    if (license === undefined || license.length < 1) {
      setLicenseError('Asset id must have a length > 1');
      valid = false;
    }

    if (xml === undefined || xml.length < 2) {
      setXmlError('XML must have a length > 2');
      valid = false;
    }

    if (valid) {
      setTransactionRequest({
        functionType: 'query',
        function: 'ReportSwID',
        args: [],
        transient: {
          'swid': {
            'primary_tag': primaryTag as string,
            'asset': assetId as string,
            'licence': license as string,
            'xml': xml as string,
          }
        }
      });
    } else {
      setTransactionRequest(undefined);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [primaryTag, assetId, license, xml]);

  return <>
    <BuilderInfo
      description="Report a SwID tag that uses a checked out license"
    />
    <TextInput
      label="Primary Tag"
      description="Primary SwID tag"
      onChange={(e) => setPrimaryTag(e.target.value)}
      error={primaryTagError}
      withAsterisk
    />
    <TextInput
      label="Asset ID"
      description="ID of the asset"
      onChange={(e) => setAssetId(e.target.value)}
      error={assetIdError}
      withAsterisk
    />
    <TextInput
      label="Licence"
      description="Licenses associated with this SwID tag"
      onChange={(e) => setLicense(e.target.value)}
      error={licenseError}
      withAsterisk
    />
    <Textarea
      label="XML"
      description="SwID XML document"
      onChange={(e) => setXml(e.target.value)}
      error={xmlError}
      withAsterisk
    />
  </>;
}

export default ReportSwid;
