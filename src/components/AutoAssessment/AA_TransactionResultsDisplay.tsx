import React from "react";
import { AssessmentTransactionRequest, AssessmentTransactionResponse } from "api/transactions_assessment"
import { Box, Paper, Text, Title } from "@mantine/core";

const CodeDisplay: React.FC<{text: string, label?: string}> = ({ label, text }) => {
  return (
  <>
    {label ? <Text size='xs'>{label}</Text> : undefined}
    <Box
      p='xs'
      sx={{
        borderRadius: '5px',
        background: '#002b36',
        color: '#839496',
      }}
    >
      <pre>
        <code style={{whiteSpace: 'pre-line'}}>
          {text}
        </code>
      </pre>
    </Box>
  </>)
}

export type AssessmentTransactionResults = {
  request: AssessmentTransactionRequest,
  response: AssessmentTransactionResponse | string,
  date: Date,
};

type Params = {
  results: AssessmentTransactionResults[]
}

const AssessmentTransactionResultsDisplay: React.FC<Params> = ({ results }) => {
  return <Box mt='md'>
    {results.map(({request, response, date}, i) =>
    <Paper mt='sm' p='md' shadow='xs' key={i}>
      <Title order={5}>Transaction: {request.function}</Title>
      <Text mb='xs' size='sm'>Sent {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}</Text>
      
      <CodeDisplay
        label="Request:"
        text={JSON.stringify(request, null, 2)}
      />

      <CodeDisplay
        label="Response:"
        text={JSON.stringify(response, null, 2)}
      />
    </Paper>)}

    {results.length === 0 ?
    <Text mt='xl' italic align='center'>
      Select a transaction and hit "Submit". Past transactions will be displayed here.
    </Text> : undefined}
  </Box>;
}

export default AssessmentTransactionResultsDisplay;
