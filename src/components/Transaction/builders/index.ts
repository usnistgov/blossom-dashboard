import { TransactionBuilder } from "../builder";

import accountGetAccount from "./AccountGetAccount";
import accountGetAccounts from "./AccountGetAccounts";

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
  accountGetAccounts,
  accountGetAccount,
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
  accountGetAccount,
  accountGetAccounts,
  
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
