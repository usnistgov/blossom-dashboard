import { TransactionRequest } from "api";
import React from "react";

export type TransactionBuilderParams = {
  setTransactionRequest: (request: TransactionRequest | undefined) => void;
};

export type TransactionBuilder = React.FC<TransactionBuilderParams>;
