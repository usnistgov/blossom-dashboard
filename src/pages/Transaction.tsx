import { useState } from "react";
import { Title, Grid, Button } from "@mantine/core";
import { postTransaction, TransactionRequest } from "api";
import { builders, TransactionResults, TransactionResultsDisplay, TransactionSelect } from "components";
import { IconClearAll } from "@tabler/icons";
import { AxiosError } from "axios";
import useSessionDatesStore from "hooks/UseSessionStore";

export default function Transaction() {
  const [responses, setResponses] = useState<TransactionResults[]>([])
  
  const onSubmit = async (request: TransactionRequest) => {      
    const responseStarted = {
      request: request,
      response: {},
      transactionStart: new Date(),
      transactionEnd: new Date(),
    };
    try {
      const response = await postTransaction(request);
      // Stuff in the response and timing data      
      responseStarted.response = response.data;
      responseStarted.transactionEnd = new Date();
      // Populate the history queue
      setResponses([
        responseStarted
       , ...responses]);

    } catch (e) {
      let message = `Client Error: ${e}`;
      if (e instanceof AxiosError) {
        message = `Server Error (${e.code}): ${e.response?.data}`;
      } else {
        message = `Non-Axios Server Error: (${JSON.stringify(e,null,2)})`;
      }
      // Stuff in the ERROR and timing data      
      responseStarted.response = message;
      responseStarted.transactionEnd = new Date();
      // Populate the history queue with the ERROR
      setResponses([
        responseStarted, 
        ...responses])
    }
  }

  // const callStarts: 
  // { arrayValue: Date[]; 
  //   setArrayValue: React.Dispatch<React.SetStateAction<Date[]>>; 
  //   addDate: () => Date; 
  //   clearDates: () => void;
  // } = useSessionDatesStore('transactionStartDates', []);

  // const callEnds: 
  // { arrayValue: Date[]; 
  //   setArrayValue: React.Dispatch<React.SetStateAction<Date[]>>; 
  //   addDate: () => Date; 
  //   clearDates: () => void;
  // } = useSessionDatesStore('transactionEndDates', []);

  return <>
    <Title>Transaction Editor (Raw)</Title>
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
          onClick={() => {
            setResponses([]);
          }}
        >
          Clear Transactions
        </Button>
        <TransactionResultsDisplay results={responses} />
      </Grid.Col>
    </Grid>
  </>;
}
