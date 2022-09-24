import { TransactionBuilder } from "../builder";

import GetAccount from "./GetAccount";
import GetAccounts from "./GetAccounts";
import GetAsset from "./GetAsset";
import GetAssets from "./GetAssets";
import RequestCheckout from "./RequestCheckout";
import ApproveCheckout from "./ApproveCheckout";
import GetLicenses from "./GetLicenses";

// In case you would like to use a builder individually
export {
  GetAccounts,
  GetAccount,
  GetAssets,
  GetAsset,
  RequestCheckout,
  ApproveCheckout,
  GetLicenses,
};

/**
 * A pre-assembled list of transaction builders
 */
const builders: Record<string, TransactionBuilder> = {
  GetAccount,
  GetAccounts,
  GetAsset,
  GetAssets,
  RequestCheckout,
  ApproveCheckout,
  GetLicenses,
};

export default builders;
