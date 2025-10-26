import { useQuery } from "@tanstack/react-query";
import type { Payment } from "@/../shared/payments";

export function fetchPayments(): Promise<Payment[]> {
  return fetch("/api/payments").then((res) => {
    if (!res.ok) throw new Error(`Failed to fetch payments: ${res.status}`);
    return res.json().then((r) => r.data as Payment[]);
  });
}

export default function usePayments() {
  const query = useQuery<Payment[], Error>({
    queryKey: ["payments"],
    queryFn: fetchPayments,
    staleTime: 1000 * 60, // 1 minute
    retry: 1,
  });

  const refetch = () => query.refetch();

  return {
    ...query,
    refetch,
  };
}
