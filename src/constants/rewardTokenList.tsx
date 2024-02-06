export interface IRewardToken {
  value: string;
  label: string;
}

export const rewardTokenOptions: IRewardToken[] = [
  {
    value: "0x4200000000000000000000000000000000000023",
    label: "ETH",
  },
  {
    value: "0x4200000000000000000000000000000000000022",
    label: "USDB",
  },
];
