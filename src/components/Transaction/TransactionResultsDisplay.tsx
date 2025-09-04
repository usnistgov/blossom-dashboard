import React, { useEffect, useState } from "react";
import { TransactionRequest, TransactionResponse } from "api"
import { Box, Paper, Text, Title } from "@mantine/core";
import useSessionDatesStore from "hooks/UseSessionStore";

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

export type TransactionResults = {
  request: TransactionRequest,
  response: TransactionResponse | string,
  transactionStart: Date,
  transactionEnd: Date,
};

type Params = {
  results: TransactionResults[]
}


function calculateTimeDifferenceInHoursForUI(dateFrom: Date, dateTo: Date): string {
  if ( dateFrom && dateTo ){
    const diffMilliseconds = Math.abs(dateTo.getTime() - dateFrom.getTime());
    const diffSeconds = diffMilliseconds / 1000;
    const diffMinutes = diffSeconds / 60;
    // const diffHours = diffMinutes / 60;
    return ` ${diffMilliseconds}ms | ${diffSeconds}s | ${diffMinutes}min `;
  }else{
    return "No Time Diff";
  }
}

function getTimeStampForUI(dateForUI: Date): string {
  if (dateForUI){
  return (`${dateForUI.getHours().toString().padStart(2, '0')}`
        +`:${dateForUI.getMinutes().toString().padStart(2, '0')}`
        +`:${dateForUI.getSeconds().toString().padStart(2, '0')}`
        +`.${dateForUI.getMilliseconds().toString().padStart(2, '0')}`
      )
    }else{
      return ("No-Date-Provided")
    }
}


const TransactionResultsDisplay: React.FC<Params> = ({ results }) => {

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

  return <Box mt='md'>
    { results.map( ({request, response, transactionStart, transactionEnd}, index) =>
      <Paper mt='sm' p='md' shadow='xs' key={index}>
      <Title order={5}>{results.length-index}. Transaction: {request.function}</Title>
      <Text mb='xs' size='sm'>
        Sent @{getTimeStampForUI(transactionStart)} 
        & Returned @{getTimeStampForUI(transactionEnd )} <br />
        Roundtrip time:{calculateTimeDifferenceInHoursForUI(
          transactionStart, 
          transactionEnd
          )}        
      </Text>
      
      <CodeDisplay
        label="Request:"
        text={JSON.stringify(request, null, 2)}
      />
      <Text mb='xs' size='sm'></Text>
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

export default TransactionResultsDisplay;
