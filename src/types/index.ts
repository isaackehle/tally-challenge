declare global {
  interface Window {
    ethereum: import("ethers").providers.ExternalProvider;
  }
}

export interface BalanceRow {
  logo: string | null;
  balance: string | null;
  symbol: string | null;
  name: string | null;
  contractAddress: string;
}
