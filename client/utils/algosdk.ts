import algosdk from "algosdk";

export const ALGOD_URL = "https://testnet-api.algonode.cloud";
export const INDEXER_URL = "https://testnet-idx.algonode.cloud";

export const algodClient = new algosdk.Algodv2("", ALGOD_URL, "");
export const indexerClient = new algosdk.Indexer("", INDEXER_URL, "");

export async function getAccountInfo(address: string) {
  const info = await algodClient.accountInformation(address).do();
  const algo = algosdk.microalgosToAlgos(Number((info as any).amount));
  return { raw: info, balance: algo };
}

export async function suggestedParams() {
  return await algodClient.getTransactionParams().do();
}

export function makePaymentTxn(sender: string, receiver: string, amountAlgo: number, params: algosdk.SuggestedParams) {
  return algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    sender,
    receiver,
    amount: algosdk.algosToMicroalgos(amountAlgo),
    suggestedParams: params,
  });
}

export async function waitForConfirmation(txId: string, timeout = 4) {
  return await algosdk.waitForConfirmation(algodClient, txId, timeout);
}
