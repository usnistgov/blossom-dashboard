import { useState } from "react";
import { Title, Grid, Button } from "@mantine/core";
import { postTransaction, TransactionRequest } from "api";
import { builders, TransactionResults, TransactionResultsDisplay, TransactionSelect } from "components";
import { IconClearAll } from "@tabler/icons";
import { AxiosError } from "axios";

export default function Transaction() {
  const [responses, setResponses] = useState<TransactionResults[]>([])
  const onSubmit = async (request: TransactionRequest) => {
    try {
      const response = await postTransaction(request);
  
      setResponses([{
        request,
        response: response.data,
        date: new Date()
      }, ...responses]);
    } catch (e) {
      let message = `Client Error: ${e}`;
      if (e instanceof AxiosError) {
        message = `Server Error (${e.code}): ${e.response?.data}`;
      } else {}
      setResponses([{
        request,
        response: message,
        date: new Date()
      }, ...responses])
    }
  }

  return <>
    <Title>BL🌸SSOM: Raw Transaction Editor</Title>
    <Grid>
      <Grid.Col md={6}>
        <TransactionSelect
          transactionBuilders={builders}
          onSubmit={onSubmit}
        />
      </Grid.Col>
      <Grid.Col md={6}>
        <Title order={3} mb='xs'>Transaction Results</Title>
        <Button
          leftIcon={<IconClearAll size={16} />}
          disabled={responses.length === 0}
          onClick={() => setResponses([])}
        >
          Clear Transactions
        </Button>
        <TransactionResultsDisplay results={responses} />
      </Grid.Col>
    </Grid>
  </>;
}
