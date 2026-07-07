import { AssessmentTransactionRequest } from "api/transactions_assessment";
import React from "react";

export type AssessmentTransactionBuilderParams = {
  setAssessmentTransactionRequest: (
    request: AssessmentTransactionRequest | undefined) => void;
};

export type AssessmentTransactionBuilder = React.FC<AssessmentTransactionBuilderParams>;