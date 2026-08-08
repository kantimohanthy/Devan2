/**
 * @file OracleProjection (Deterministic Oracle Response ViewModel)
 */

import { OracleUnifiedResponse } from "@/lib/intelligence/response-composer";

export type OracleViewModel = OracleUnifiedResponse;

export class OracleProjection {
  static createProjection(response: OracleUnifiedResponse): OracleViewModel {
    return { ...response };
  }
}
