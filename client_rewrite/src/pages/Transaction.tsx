import { useState } from "react";
import { Text, Title, Grid, Button } from "@mantine/core";
import { TransactionRequest, TransactionResponse } from "api";
import { builders, TransactionSelect } from "components";

export default function Transaction() {
  const [responses, setResponses] = useState<TransactionResponse[]>([])
  const onSubmit = async (request: TransactionRequest) => {
    console.log('transaction request: ', request);

    // const response = await postTransaction(request);
    
    // fake sleeping for now
    await new Promise(r => setTimeout(r, 1000));
    const response = {'test': 'response'};

    console.log('transaction response: ', response);

    setResponses([...responses, response]);
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
        <Button onClick={() => setResponses([])}>Clear Transactions</Button>
        <br />
        <Text>
          <p>
            {JSON.stringify(responses, null, 2)}
          </p>
        </Text>
      </Grid.Col>
    </Grid>

  </>;
}
