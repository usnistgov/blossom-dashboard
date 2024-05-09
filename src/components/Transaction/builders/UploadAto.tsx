import { TransactionBuilder } from "../builder";
import { JsonInput } from '@mantine/core';
import { useEffect, useState } from "react";
import BuilderInfo from "./BuilderInfo";

const UploadAto: TransactionBuilder = ({ setTransactionRequest }) => {
  const [ato, setAto] = useState<string>();
  const [atoError, setAtoError] = useState<string>();
  useEffect(() => {
    setAtoError(undefined);

    if (ato) {
      setTransactionRequest({
        functionType: 'query',
        function: 'UploadATO',
        args: [],
        transient: {
          'ato': {
            'ato': ato
          }
        }
      });
    } else {
      setTransactionRequest(undefined);
      setAtoError('Account name must have a length > 1');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ato]);

  return <>
    <BuilderInfo
      description="Allows the [system_owner] of an account to upload an [ATO Attestation] string."
      info="Calling this function will not update the status of the account.
        Update must be done by the SAMS admin (next) using UpdateAccountStatus() method."
      warn="Prerequisites: An account must already have been requested, and approved using RequestAccount, then ApproveAccount"
    />
    <JsonInput
      label="ATO"
      onChange={setAto}
      error={atoError}
      validationError="Invalid json"
      formatOnBlur
      withAsterisk
    />
  </>;
}

export default UploadAto;
