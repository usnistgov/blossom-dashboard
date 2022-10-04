import { useState } from "react";
import { Title, Grid, Button } from "@mantine/core";
import { postTransaction, TransactionRequest } from "api";
import { builders, TransactionResults, TransactionResultsDisplay, TransactionSelect } from "components";
import { IconClearAll } from "@tabler/icons";

export default function Transaction() {
  const [responses, setResponses] = useState<TransactionResults[]>([])
  const onSubmit = async (request: TransactionRequest) => {
    try {
      const response = await postTransaction(request);

      // fake sleeping for now
      // await new Promise(r => setTimeout(r, 1000));
      // const response = {'test': 'response'};
  
      setResponses([{
        request,
        response: response.data,
        date: new Date()
      }, ...responses]);
    } catch (e) {
      setResponses([{
        request,
        response: `Client Error: ${e}`,
        date: new Date()
      }, ...responses])
    }
  }

  return <>
    <Title>Bloss@M Raw Transaction Editor</Title>
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
