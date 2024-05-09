import { TransactionBuilder } from "../builder";
import { TextInput} from '@mantine/core';
import { useEffect, useState } from "react";
import BuilderInfo from "./BuilderInfo";

const RequestAccount: TransactionBuilder = ({ setTransactionRequest }) => {
  const [systemOwner, setSystemOwner] = useState<string>();
  const [systemAdmin, setSystemAdmin] = useState<string>();
  const [acquisitionSpecialist, setAdquisitionSpecialist] = useState<string>();

  const [systemOwnerError, setSystemOwnerError] = useState<string>();
  const [systemAdminError, setSystemAdminError] = useState<string>();
  const [acquisitionSpecialistError, setAcquisitionSpecialistError] = useState<string>();

  useEffect(() => {
    setSystemOwnerError(undefined);
    setSystemAdminError(undefined);
    setAcquisitionSpecialistError(undefined)

    let valid = true;

    if (systemOwner === undefined || systemOwner.length < 1) {
      setSystemOwnerError('System Owner id must have a length > 1');
      valid = false;
    }

    if (systemAdmin === undefined || systemAdmin.length < 1) {
      setSystemAdminError('System Admin id must have a length > 1');
      valid = false;
    }

    if (acquisitionSpecialist === undefined || acquisitionSpecialist.length < 1) {
      setAcquisitionSpecialistError('Acquisition Specialist must have a length > 1');
      valid = false;
    }

    if (valid) {
      setTransactionRequest({
        functionType: 'query',
        function: 'RequestAccount',
        args: [],
        transient: {
          'account': {
            'system_owner': systemOwner as string,
            'account': systemAdmin as string,
            'acquisition_specialist': acquisitionSpecialist as string,
          }
        }
      });
    } else {
      setTransactionRequest(undefined);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [systemOwner, systemAdmin, acquisitionSpecialist]);

  return <>
    <BuilderInfo
      description="Request an account for a member on the network."
      info="Set the users that will assume the roles within the blossom system.
        The roles are System Owner, System Administrator, and Acquisition Specialist."
      warn="This function will set the status of this account to 'Pending: waiting for approval'.
        The SAMS admin will need to call ApproveAccount to complete the account registration.
        Prerequisites: The member must already have their own PDC in the collections_config."
    />
    <TextInput
      label="System owner"
      description="[System owner] user"
      onChange={(e) => setSystemOwner(e.target.value)}
      error={systemOwnerError}
    />
    <TextInput
      label="System admin"
      description="[System admin] user"
      onChange={(e) => setSystemAdmin(e.target.value)}
      error={systemAdminError}
    />
    <TextInput
      label="Acquisition specialist"
      description="[System administrator] user"
      onChange={(e) => setAdquisitionSpecialist(e.target.value)}
      error={acquisitionSpecialistError}
    />
  </>;
}

export default RequestAccount;
