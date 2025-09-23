import { useState } from "react";
import { Title, Grid, Button } from "@mantine/core";
import { postAssessmentTransaction, AssessmentTransactionRequest } from "api/transactions_assessment";
import { aa_builders, 
  AssessmentTransactionResults, 
  AssessmentTransactionResultsDisplay, 
  AssessmentTransactionSelect } from "components/AutoAssessment";
import { IconClearAll } from "@tabler/icons-react";
import { AxiosError } from "axios";

export default function Transaction() {
  const [responses, setResponses] = useState<AssessmentTransactionResults[]>([])
  
  const onSubmit = async (request: AssessmentTransactionRequest) => {
    try {
      const response = await postAssessmentTransaction(request);
  
      setResponses([{
        request,
        response: response.data,
        date: new Date()
      }, ...responses]);
    } catch (e) {
      let message = `Client Error: ${e}`;
      if (e instanceof AxiosError) {
        message = `Server Error (${e.code}): ${e.response?.data}`;
      } else {
        message = `Non-Axios Server Error: (${JSON.stringify(e,null,2)})`;
      }
      setResponses([{
        request,
        response: message,
        date: new Date()
      }, ...responses])
    }
  }

  return <>
    <Title>Assessment Editor (Raw)</Title>
    <Grid>
      <Grid.Col span={{md:6}}>
        <AssessmentTransactionSelect
          aa_transactionBuilders={aa_builders}
          onSubmit={onSubmit}
        />
      </Grid.Col>
      <Grid.Col  span={{md:6}}>
        <Title order={3} mb='xs'>Transaction Results</Title>
        <Button
          leftSection={<IconClearAll size={16} />}
          disabled={responses.length === 0}
          onClick={() => setResponses([])}
        >
          Clear Transactions
        </Button>
        <AssessmentTransactionResultsDisplay results={responses} />
      </Grid.Col>
    </Grid>
  </>;
}
