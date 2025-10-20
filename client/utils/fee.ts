// Fee estimation utilities
// For now, this contains a small wrapper around algod suggested params and a mock estimator.
import { suggestedParams } from '@/utils/algosdk';

export type FeeEstimate = {
  fee: number; // microalgos
  recommended?: number; // microalgos
};

// Returns an estimated fee for the given amount (in ALGO). Uses suggested params when available.
export async function estimateFee(amountAlgo: number): Promise<FeeEstimate> {
  try {
    const params = await suggestedParams();
    // suggested params may contain fee (in microalgos)
    const baseFee = (params && (params as any).fee) ? Number((params as any).fee) : 1000; // default 1000 microalgos
    // simple heuristic: baseFee + small proportional component
    const proportional = Math.max(0, Math.round((amountAlgo || 0) * 1_000_000 * 0.0001));
    const fee = baseFee + proportional;
    // recommended could be increased slightly to account for priority
    const recommended = Math.max(fee, baseFee + 500);
    return { fee, recommended };
  } catch (e) {
    // fallback to a conservative default
    return { fee: 1000, recommended: 1500 };
  }
}
