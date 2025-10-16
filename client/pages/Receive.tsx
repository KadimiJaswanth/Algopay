import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ReceiveQR from '@/components/ReceiveQR';
import { useWallet } from '@/context/WalletContext';

const Receive: React.FC = () => {
	const { address } = useWallet();

	const shownAddress = address ?? 'ALGO-MOCK-ADDRESS-EXAMPLE-XYZ123';

		return (
			<main className="p-4" role="main" aria-labelledby="receive-heading">
				<section aria-labelledby="receive-heading" className="animate-fade-in">
					<Card>
						<CardHeader>
							<CardTitle id="receive-heading">Receive ALGO</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="mb-4">Show this QR code to a sender to receive ALGO.</p>
							<div className="flex flex-col md:flex-row md:items-start md:gap-8">
								<div className="flex-1">
									<ReceiveQR address={shownAddress} />
								</div>
								<aside className="flex-1 mt-6 md:mt-0" aria-label="Scan to pay hints">
									<h3 className="text-lg font-semibold">Scan-to-pay hints</h3>
									<ul className="list-disc list-inside mt-3 text-sm space-y-2 text-muted-foreground">
										<li>Open your sender's wallet and choose "Scan QR" or "Send" &gt; "Scan".</li>
										<li>Make sure the sender's wallet is set to the same network (MainNet/TestNet).</li>
										<li>To request a specific amount, share the URI: <code className="font-mono">algo:{shownAddress}?amount=1</code></li>
										<li>If scanning fails, tap "Copy address" and paste into the sender's wallet manually.</li>
									</ul>
								</aside>
							</div>
						</CardContent>
					</Card>
				</section>
			</main>
		);
};

export default Receive;
