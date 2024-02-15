export type TokenRevenue = {
  name: string;
  symbol: string;
  tokenReward: string;
  totalSupply: number;
};

export type TokenRevenueClaimable = {
  name: string;
  symbol: string;
  reward: number;
  totalSupply: number;
  tokenReward: string;
  logo: string;
  address: string;
};

export interface tTokenRevenue {
  token: {
    decimals: string;
    id: string;
    name: string;
    symbol: string;
  };
  tokenAddress?: {
    decimals: string;
    id: string;
    name: string;
    symbol: string;
  };
  blockNumber: number;
  blockTimestamp: number;
  id: string;
  userAddress: string;
  totalSupply: number;
  transactionHash: string;
  value: number;
}
