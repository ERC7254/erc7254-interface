export interface ITokenHistory {
  blockNumber: number;
  blockTime: string;
  from: string;
  to: string;
  tokenAddress: {
    decimals: string;
    id: string;
    name: string;
    symbol: string;
  };
  transactionHash: string;
  value: number;
}

// export const tokenHistory: ITokenHistory[] = [
//   {
//     txHash: "0x00",
//     method: "Execute",
//     from: "0x08",
//     to: "0x07",
//   },
//   {
//     txHash: "0x00",
//     method: "Execute",
//     from: "0x08",
//     to: "0x07",
//   },
//   {
//     txHash: "0x00",
//     method: "Execute",
//     from: "0x08",
//     to: "0x07",
//   },
//   {
//     txHash: "0x00",
//     method: "Execute",
//     from: "0x08",
//     to: "0x07",
//   },
//   {
//     txHash: "0x00",
//     method: "Execute",
//     from: "0x08",
//     to: "0x07",
//   },
//   {
//     txHash: "0x00",
//     method: "Execute",
//     from: "0x08",
//     to: "0x07",
//   },
//   {
//     txHash: "0x00",
//     method: "Execute",
//     from: "0x08",
//     to: "0x07",
//   },
// ];
