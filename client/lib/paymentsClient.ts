import type { CreatePaymentRequest, RecurringPaymentRequest, Payment } from "@/../shared/payments";

const API_PREFIX = "/api/payments";

export async function getPayments(): Promise<Payment[]> {
  const res = await fetch(API_PREFIX);
  if (!res.ok) throw new Error(`Failed to fetch payments: ${res.status}`);
  const body = await res.json();
  return body.data as Payment[];
}

export async function createPayment(payload: CreatePaymentRequest): Promise<Payment> {
  const res = await fetch(API_PREFIX, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Failed to create payment: ${res.status}`);
  const body = await res.json();
  return body.data as Payment;
}

export async function createRecurring(payload: RecurringPaymentRequest) {
  const res = await fetch(`${API_PREFIX}/recurring`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Failed to create recurring payment: ${res.status}`);
  const body = await res.json();
  return body.data;
}

export default { getPayments, createPayment, createRecurring };
