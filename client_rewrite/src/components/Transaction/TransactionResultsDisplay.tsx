import React from "react";
import { TransactionRequest, TransactionResponse } from "api"
import { Box, Code } from "@mantine/core";

export type TransactionResults = {
  request: TransactionRequest,
  response: TransactionResponse,
  date: Date,
};

type Params = {
  results: TransactionResults[]
}

const TransactionResultsDisplay: React.FC<Params> = ({ results }) => {
  return <Box mt='md'>
    {results.map(({request, response, date}, i) => <div key={i}>
      {date.toString()} {request.name}
      <pre>
        <Code>
          {JSON.stringify(response, null, 2)}
        </Code>
      </pre>
    </div>)}
  </Box>;
}

export default TransactionResultsDisplay;
