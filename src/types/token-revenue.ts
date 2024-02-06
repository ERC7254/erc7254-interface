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
