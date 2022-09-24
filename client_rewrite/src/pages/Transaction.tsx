import { useState } from "react";
import { Title, Grid, Button } from "@mantine/core";
import { TransactionRequest } from "api";
import { builders, TransactionResults, TransactionResultsDisplay, TransactionSelect } from "components";
import { IconClearAll } from "@tabler/icons";

export default function Transaction() {
  const [responses, setResponses] = useState<TransactionResults[]>([])
  const onSubmit = async (request: TransactionRequest) => {
    console.log('transaction request: ', request);

    // const response = await postTransaction(request);
    
    // fake sleeping for now
    await new Promise(r => setTimeout(r, 1000));
    const response = {'test': 'response'};

    console.log('transaction response: ', response);

    setResponses([{
      request,
      response,
      date: new Date()
    }, ...responses]);
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
