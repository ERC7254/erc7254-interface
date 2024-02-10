// Define a simple mapping of addresses to token names
const addressToTokenMapping: Record<string, string> = {
  "0x4200000000000000000000000000000000000023": "ETH",
  "0x4200000000000000000000000000000000000022": "USDB",
};

export const tokenMapping = (
  address: string | undefined,
): string | undefined => {
  if (!address) return "";
  const tokenName = addressToTokenMapping[address.toString().toLowerCase()];
  if (!tokenName) return "/";
  return tokenName;
};

export const tokenRevertMapping = (
  tokenName: string | undefined,
): string | undefined => {
  if (!tokenName) return "";

  // Find the address by searching through the mapping
  const address = Object.keys(addressToTokenMapping).find(
    (key) => addressToTokenMapping[key] === tokenName,
  );

  return address || "/";
};
