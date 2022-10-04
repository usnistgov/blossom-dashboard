import React, { useState } from "react";
import { Alert, Button, Select } from "@mantine/core";
import { IconAlertCircle, IconDatabase } from '@tabler/icons';
import { TransactionRequest } from "api";
import { TransactionBuilder } from "./builder";

type Params = {
  transactionBuilders: Record<string, TransactionBuilder>;
  onSubmit: (request: TransactionRequest) => Promise<void>;
}

/**
 * Select a transaction from a list and display the resulting transaction builder
 */
const TransactionSelect: React.FC<Params> = ({ transactionBuilders, onSubmit }) => {
  // Set from the child transaction request builder
  const [transactionRequest, setTransactionRequest] = useState<TransactionRequest>();
  // Used to prevent "double submissions".
  // Disables submit button while transaction request loads.
  const [loading, setLoading] = useState(false);  
  // Mantine frustratingly uses "null" instead of "undefined"
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  
  const SelectedTransactionBuilder = selectedKey ? transactionBuilders[selectedKey] : undefined;
  
  return <>
    <Select
      label="Transaction Method"
      description="Select which Bloss@M blockchain method to invoke"
      data={Object.keys(transactionBuilders).map((key) => ({label: key, value: key}))}
      value={selectedKey}
      onChange={(key) => {
        // Reset transaction request (just in case)
        setTransactionRequest(undefined);
        setSelectedKey(key);
      }}
      mb='sm'
    />

    {SelectedTransactionBuilder ?
      // If a transaction builder was selected, display it
      <SelectedTransactionBuilder {...{setTransactionRequest}} /> :
      <Alert
        icon={<IconAlertCircle size={16} />}
        title="Invalid Transaction Request"
        color="yellow"
        mx='xl'
      >
        Please select a transaction type first.
      </Alert>}

    <Button
      disabled={transactionRequest === undefined}
      leftIcon={<IconDatabase size={14} />}
      loading={loading}
      loaderPosition="right"
      onClick={() => {
        if (transactionRequest) {
          setLoading(true);
          onSubmit(transactionRequest).finally(() => setLoading(false));
        }
      }}
      mt='sm'
    >
      Submit
    </Button>
  </>;
}

export default TransactionSelect;
