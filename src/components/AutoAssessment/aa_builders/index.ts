import { AssessmentTransactionBuilder } from "../aa_builder";


import aaEC2_GetUsers from "./AA_GetUsers";

// In case you would like to use a builder individually
export {
aaEC2_GetUsers
};

/**
 * A pre-assembled list of transaction builders
 */
const aa_builders: Record<string, AssessmentTransactionBuilder> = {
  aaEC2_GetUsers,
};

export default aa_builders;
