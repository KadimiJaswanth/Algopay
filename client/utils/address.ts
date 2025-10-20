// Small Algorand address utilities
// Provides a lightweight validation helper used by forms and QR scanning.
import algosdk from 'algosdk';

export function isValidAlgorandAddress(addr: string): boolean {
  if (!addr || typeof addr !== 'string') return false;
  try {
    // algosdk provides a checksum-validated address class
  const decoded = algosdk.decodeAddress(addr);
  // decodeAddress throws on invalid; result contains publicKey (Uint8Array)
  return !!(decoded && (decoded.publicKey as Uint8Array).length > 0);
  } catch (e) {
    return false;
  }
}

export function normalizeAddress(addr: string): string {
  if (!addr) return addr;
  return addr.trim();
}

export type AddressValidationResult = {
  valid: boolean;
  reason?: string;
};

export function validateAddress(addr: string): AddressValidationResult {
  if (!addr || addr.trim().length === 0) return { valid: false, reason: 'Address is required' };
  const a = addr.trim();
  if (a.length < 40) return { valid: false, reason: 'Address too short' };
  if (!isValidAlgorandAddress(a)) return { valid: false, reason: 'Invalid Algorand address' };
  return { valid: true };
}
