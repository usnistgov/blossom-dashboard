import React, { useState } from "react";
import { Alert, Button, Select } from "@mantine/core";
import { IconAlertCircle, IconDatabase } from '@tabler/icons-react';
import { AssessmentTransactionBuilder } from "./aa_builder";
import { AssessmentTransactionRequest } from "api/transactions_assessment";

type Params = {
  aa_transactionBuilders: Record<string, AssessmentTransactionBuilder>;
  onSubmit: (request: AssessmentTransactionRequest) => Promise<void>;
}

/**
 * Select a transaction from a list and display the resulting transaction builder
 */
const AssessmentTransactionSelect: React.FC<Params> 
= ({ aa_transactionBuilders: transactionBuilders, onSubmit }) => {
  // Set from the child transaction request builder
  const [assessmentTransactionRequest, setAssessmentTransactionRequest] = useState<AssessmentTransactionRequest>();
  // Used to prevent "double submissions".
  // Disables submit button while transaction request loads.
  const [loading, setLoading] = useState(false);  
  // Mantine frustratingly uses "null" instead of "undefined"
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  
  const SelectedAssessmentTransactionBuilder = 
  (selectedKey ? transactionBuilders[selectedKey] : undefined);
  

  return <>
    <Select
      label="Assessment Method"
      description="Select which Bloss@M Auto Assessment method to test"
      data={Object.keys(transactionBuilders).map((key) => ({label: key, value: key}))}
      value={selectedKey}
      onChange={(key) => {
        // Reset transaction request (just in case)
        setAssessmentTransactionRequest(undefined);
        setSelectedKey(key);
      }}
      mb='sm'
    />


    {SelectedAssessmentTransactionBuilder ?
      // If a transaction builder was selected, display it
      <SelectedAssessmentTransactionBuilder {...{setAssessmentTransactionRequest}} /> :
      // Alert in case there is nothing selected
      <Alert
        icon={<IconAlertCircle size={16} />}
        title="Invalid Transaction Request"
        color="yellow"
        mx='xl'
      >
        Please select a transaction type first.
      </Alert>}

    {/* {SelectedTransactionBuilder ?
      // If a transaction builder was selected, display it
      <SelectedTransactionBuilder 
      setAssessmentTransactionRequest=
      {function (request: AssessmentTransactionRequest | undefined): void {
        throw new Error("Function not implemented.");
      } } {...{ setTransactionRequest }} /> :
      // Alert in case there is nothing selected
      <Alert
        icon={<IconAlertCircle size={16} />}
        title="Invalid Transaction Request"
        color="yellow"
        mx='xl'
      >
        Please select a transaction type first.
      </Alert>} */}

    <Button
      disabled={assessmentTransactionRequest === undefined}
      leftSection={<IconDatabase size={14} />}
      loading={loading}
      // loaderPosition="right"
      onClick={() => {
        if (assessmentTransactionRequest) {
          setLoading(true);
          onSubmit(assessmentTransactionRequest).finally(() => setLoading(false));
        }
      }}
      mt='sm'
    >
      Submit
    </Button>
  </>;
}

export default AssessmentTransactionSelect;
