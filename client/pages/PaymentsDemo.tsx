import React from "react";
import PaymentCard from "@/components/ui/PaymentCard";
import RecurringPaymentForm from "@/components/ui/RecurringPaymentForm";

const paymentsSample = [
  {
    id: "pay_001",
    title: "Subscription - Pro Plan",
    amount: 999,
    currency: "USD",
    date: new Date().toISOString(),
    status: "completed",
  },
  {
    id: "pay_002",
    title: "One-time recharge",
    amount: 2500,
    currency: "USD",
    date: new Date().toISOString(),
    status: "pending",
  },
  {
    id: "pay_003",
    title: "Failed charge",
    amount: 4500,
    currency: "USD",
    date: new Date().toISOString(),
    status: "failed",
  },
];

export default function PaymentsDemo() {
  const handleRetry = (id: string) => {
    // placeholder: in a real app this would call the payments API
    // and attempt to re-run the payment
    // eslint-disable-next-line no-console
    console.log("Retry payment", id);
  };

  const handleView = (id: string) => {
    // navigate to payment details or show modal
    // eslint-disable-next-line no-console
    console.log("View payment", id);
  };

  const handleSaveRecurring = async (data: any): Promise<void> => {
    // this would normally POST to /api/payments/recurring
    // here we emulate network latency
    // eslint-disable-next-line no-console
    console.log("Saving recurring", data);
    await new Promise<void>((res) => setTimeout(() => res(), 500));
    return;
  };

  return (
    <div className="space-y-6 p-6">
      <section>
        <h2 className="text-2xl font-semibold">Payments demo</h2>
        <p className="mt-1 text-sm text-slate-500">Showcasing PaymentCard and RecurringPaymentForm components.</p>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {paymentsSample.map((p) => (
          <PaymentCard
            key={p.id}
            id={p.id}
            title={p.title}
            amount={p.amount}
            currency={p.currency}
            date={p.date}
            status={p.status as any}
            onRetry={handleRetry}
            onView={handleView}
          />
        ))}
      </section>

      <section className="mt-6 max-w-2xl">
        <h3 className="text-lg font-medium">Create recurring payment</h3>
        <div className="mt-3">
          <RecurringPaymentForm onSave={handleSaveRecurring} />
        </div>
      </section>
    </div>
  );
}
