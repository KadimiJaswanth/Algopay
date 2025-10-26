// Shared payment-related types used on client and server
export type Currency = string;

export type PaymentStatus = "pending" | "completed" | "failed" | "refunded";

export interface Payment {
  id: string;
  amount: number; // cents
  currency: Currency;
  createdAt: string; // ISO date
  status: PaymentStatus;
  description?: string;
  metadata?: Record<string, unknown>;
}

export interface CreatePaymentRequest {
  amount: number; // cents
  currency?: Currency;
  description?: string;
  metadata?: Record<string, unknown>;
}

export interface RecurringPaymentRequest {
  amount: number;
  currency?: Currency;
  startDate?: string;
  frequency: "daily" | "weekly" | "monthly" | "yearly";
  occurrences?: number | null;
  description?: string;
}

export interface RecurringPayment extends RecurringPaymentRequest {
  id: string;
  createdAt: string;
}

// Small helper utils
export const formatCentsToMajor = (cents: number) => (cents / 100).toFixed(2);
