import { TransactionBuilder } from "../builder";
import GetAccounts from "./GetAccounts";

export { GetAccounts };

/**
 * A pre-assembled list of transaction builders
 */
const builders: Record<string, TransactionBuilder> = {
  GetAccounts,
};

export default builders;
