export const truncateAddress = (
  address: string,
  start = 8,
  end = 6,
): string => {
  if (!address) return "";
  return address.slice(0, start) + "..." + address.slice(-end);
};
