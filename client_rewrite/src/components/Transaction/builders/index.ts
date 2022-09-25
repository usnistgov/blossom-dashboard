import { TransactionBuilder } from "../builder";

import GetAccount from "./GetAccount";
import GetAccounts from "./GetAccounts";
import GetAsset from "./GetAsset";
import GetAssets from "./GetAssets";
import RequestCheckout from "./RequestCheckout";
import ApproveCheckout from "./ApproveCheckout";
import GetLicenses from "./GetLicenses";
import ReportSwid from "./ReportSwid";
import GetSwidAssociatedWithAsset from "./GetSwidAssociatedWithAsset";
import DeleteSwid from "./DeleteSwid";
import InitiateCheckin from "./InitiateCheckin";
import ProcessCheckin from "./ProcessCheckin";
import RequestAccount from "./RequestAccount";
import ApproveAccount from "./ApproveAccount";
import OnboardAsset from "./OnboardAsset";
import OffboardAsset from "./OffboardAsset";
import UploadAto from "./UploadAto";

// In case you would like to use a builder individually
export {
  GetAccounts,
  GetAccount,
  GetAssets,
  GetAsset,
  RequestCheckout,
  ApproveCheckout,
  GetLicenses,
  ReportSwid,
  GetSwidAssociatedWithAsset,
  DeleteSwid,
  InitiateCheckin,
  ProcessCheckin,
  RequestAccount,
  ApproveAccount,
  OnboardAsset,
  OffboardAsset,
  UploadAto,
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
  ReportSwid,
  GetSwidAssociatedWithAsset,
  DeleteSwid,
  InitiateCheckin,
  ProcessCheckin,
  RequestAccount,
  ApproveAccount,
  OnboardAsset,
  OffboardAsset,
  UploadAto,
};

export default builders;
