import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import type { Payment, CreatePaymentRequest, RecurringPayment, RecurringPaymentRequest } from "../../shared/payments";

const router = Router();

// in-memory store (demo only)
const payments: Payment[] = [];
const recurring: RecurringPayment[] = [];

router.get("/", (req, res) => {
  res.json({ data: payments.slice().reverse() });
});

router.post("/", (req, res) => {
  const body = req.body as CreatePaymentRequest;
  if (!body || typeof body.amount !== "number" || body.amount <= 0) {
    return res.status(400).json({ error: "invalid amount" });
  }

  const p: Payment = {
    id: uuidv4(),
    amount: body.amount,
    currency: body.currency || "USD",
    createdAt: new Date().toISOString(),
    status: "pending",
    description: body.description,
    metadata: body.metadata || {},
  };
  payments.push(p);
  res.status(201).json({ data: p });
});

router.post("/recurring", (req, res) => {
  const body = req.body as RecurringPaymentRequest;
  if (!body || typeof body.amount !== "number" || body.amount <= 0) {
    return res.status(400).json({ error: "invalid amount" });
  }

  const r: RecurringPayment = {
    id: uuidv4(),
    amount: body.amount,
    currency: body.currency || "USD",
    startDate: body.startDate || new Date().toISOString(),
    frequency: body.frequency,
    occurrences: body.occurrences ?? null,
    description: body.description,
    createdAt: new Date().toISOString(),
  } as RecurringPayment;

  recurring.push(r);
  res.status(201).json({ data: r });
});

export default router;
