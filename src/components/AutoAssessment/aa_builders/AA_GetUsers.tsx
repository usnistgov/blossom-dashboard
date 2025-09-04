import { AssessmentTransactionBuilder } from "../aa_builder";
import { TextInput} from '@mantine/core';
import { useEffect, useState } from "react";
import BuilderInfo from "../../Transaction/builders/BuilderInfo";



const AA_GetUsers: AssessmentTransactionBuilder = ({ setAssessmentTransactionRequest }) => {
    
  const [user, setUser] = useState<string>();

  const [userError, setAccountError] = useState<string>();

  useEffect(() => {
    if (user) {
         // functionType: 'invoke',
        // function: 'account:GetAccount',
        // args: [user],     
        setAssessmentTransactionRequest({
          type: "Assess",
          key2:"",
          key3:""
        });
      setAccountError(undefined);
    } else {
      setAssessmentTransactionRequest(undefined);
      setAccountError('User name must have a length > 1 Or be "ALL"');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return <>
    <BuilderInfo description="Get public (name, mspid, status) and private (ato, assets) info for an account"/>
    <TextInput
      label="User Name"
      onChange={(e) => setUser(e.target.value)}
      error={userError}
      withAsterisk
    />
  </>;
}


export default AA_GetUsers;