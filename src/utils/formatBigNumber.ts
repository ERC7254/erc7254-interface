export const formatBigNumber = (value: number, toFixed: number = 9): string => {
  const parts = (Number(value) / Number(10n ** 18n))
    .toFixed(toFixed)
    .replace(/\.?0+$/, "");

  const [integerPart, decimalPart] = parts.split(".");

  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const formattedValue = decimalPart
    ? `${formattedInteger}.${decimalPart}`
    : formattedInteger;

  return formattedValue;
};
