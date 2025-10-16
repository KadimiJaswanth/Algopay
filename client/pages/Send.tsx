import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useWallet } from '@/context/WalletContext';
import { formatAlgo } from '@/utils/formatters';

export default function Send() {
	const { address, balance, sendMockTxn } = useWallet();
	const [to, setTo] = useState('');
	const [amount, setAmount] = useState('');
	const [note, setNote] = useState('');
	const [errors, setErrors] = useState<{ to?: string; amount?: string }>({});
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [isSending, setIsSending] = useState(false);

	function validate() {
		const e: typeof errors = {};
		if (!to || to.trim().length < 5) e.to = 'Enter a valid recipient address';
		const amt = Number(amount);
		if (isNaN(amt) || amt <= 0) e.amount = 'Enter a valid amount';
		if (balance != null && amt > balance) e.amount = 'Insufficient balance';
		setErrors(e);
		return Object.keys(e).length === 0;
	}

	async function handleSubmit(e?: React.FormEvent) {
		e?.preventDefault();
		if (!validate()) return;
		setConfirmOpen(true);
	}

	async function confirmSend() {
		setIsSending(true);
		try {
			const txn = await sendMockTxn(to, Number(amount));
			// Show a small success (component-level) then reset
			setConfirmOpen(false);
			setTo('');
			setAmount('');
			setNote('');
			// optionally show more details or navigate to transactions
		} catch (err) {
			// handled by context toasts
		} finally {
			setIsSending(false);
		}
	}

	return (
		<div className="container max-w-3xl mx-auto py-8">
			<Card>
				<CardHeader>
					<CardTitle>Send ALGO</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<label className="text-sm">Recipient address</label>
							<Input value={to} onChange={(e) => setTo(e.target.value)} placeholder="Enter ALGO address or paste" />
							{errors.to && <div className="text-xs text-red-600 mt-1">{errors.to}</div>}
						</div>

						<div>
							<label className="text-sm">Amount (ALGO)</label>
							<Input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g. 1.234" />
							{errors.amount && <div className="text-xs text-red-600 mt-1">{errors.amount}</div>}
							{balance != null && <div className="text-xs text-muted-foreground mt-1">Balance: {formatAlgo(balance)}</div>}
						</div>

						<div>
							<label className="text-sm">Note (optional)</label>
							<Input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Payment note" />
						</div>

						<div className="flex items-center gap-3">
							<Button type="submit">Review</Button>
							<Button variant="ghost" onClick={() => { setTo(''); setAmount(''); setNote(''); }}>Clear</Button>
						</div>
					</form>
				</CardContent>
			</Card>

			<Dialog open={confirmOpen} onOpenChange={(o) => setConfirmOpen(o)}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Confirm Send</DialogTitle>
					</DialogHeader>
					<div className="mt-2">
						<div>To: {to}</div>
						<div>Amount: {amount} ALGO</div>
						{note && <div>Note: {note}</div>}
					</div>
					<DialogFooter>
						<div className="flex gap-2">
							<Button variant="secondary" onClick={() => setConfirmOpen(false)} disabled={isSending}>Cancel</Button>
							<Button onClick={() => confirmSend()} disabled={isSending}>{isSending ? 'Sending...' : 'Confirm Send'}</Button>
						</div>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}

