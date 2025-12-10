import React, { useEffect, useState } from "react";
import { Alert, Button, Select } from "@mantine/core";
import { IconAlertCircle, IconDatabase } from "@tabler/icons-react";
import { TransactionRequest } from "api";
import { TransactionBuilder } from "./builder";
import useSessionDatesStore from "hooks/UseSessionStore";

type Params = {
  transactionBuilders: Record<string, TransactionBuilder | undefined>;
  onSubmit: (request: TransactionRequest) => Promise<void>;
};

/**
 * Select a transaction from a list and display the resulting transaction builder
 */
const TransactionSelect: React.FC<Params> = ({
  transactionBuilders,
  onSubmit,
}) => {
  // Set from the child transaction request builder
  const [transactionRequest, setTransactionRequest] =
    useState<TransactionRequest>();
  // Used to prevent "double submissions".
  // Disables submit button while transaction request loads.
  const [loading, setLoading] = useState(false);
  // Mantine frustratingly uses "null" instead of "undefined"
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const SelectedTransactionBuilder = selectedKey
    ? transactionBuilders[selectedKey]
    : undefined;

  /// --------------------------------------------------
  /// This is the set up for the call timing wrap-around
  // const callStarts: 
  // { arrayValue: Date[]; 
  //   setArrayValue: React.Dispatch<React.SetStateAction<Date[]>>; 
  //   addDate: () => Date; 
  //   clearDates: () => void;
  // } = useSessionDatesStore("transactionStartDates", []);

  // const callEnds: 
  // { arrayValue: Date[]; 
  //   setArrayValue: React.Dispatch<React.SetStateAction<Date[]>>; 
  //   addDate: () => Date; 
  //   clearDates: () => void;
  // } = useSessionDatesStore("transactionEndDates", []);
  // useEffect(() => {
  //   // Store the dates that are ISO strings into session
  //   localStorage.setItem('transactionStartDate', JSON.stringify(transactionStartDates));
  // }, [transactionStartDates]);
  /// --------------------------------------------------

  return (
    <>
      <Select
        label="Transaction Method"
        description="Select which Bloss@M blockchain method to invoke"
        data={Object.keys(transactionBuilders).map((key) => ({
          label: key,
          value: key,
        }))}
        value={selectedKey}
        onChange={(key) => {
          // Reset transaction request (just in case)
          setTransactionRequest(undefined);
          setSelectedKey(key);
        }}
        mt="sm"
      />

      {SelectedTransactionBuilder ? (
        // If a transaction builder was selected, display it
        <SelectedTransactionBuilder {...{ setTransactionRequest }} />
      ) : (
        // Alert in case there is nothing selected
        <Alert
          icon={<IconAlertCircle size={16} />}
          title="Invalid Transaction Request"
          color="yellow"
          mx="xl"
        >
          Please select a transaction type first.
        </Alert>
      )}

      <Button
        disabled={transactionRequest === undefined}
        leftSection={<IconDatabase size={14} />}
        loading={loading}
        // loaderPosition="right"
        onClick={() => {
          if (transactionRequest) {
            setLoading(true);
            onSubmit(transactionRequest).finally(() => {
              // callEnds.addDate();
              setLoading(false);
            });
          }
        }}
        mt="sm"
      >
        Submit
      </Button>
    </>
  );
};

export default TransactionSelect;
