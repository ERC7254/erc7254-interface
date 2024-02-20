export const formatBigNumber = (value: number, toFixed: number = 9): string => {
  let parts = (Number(value) / Number(10n ** 18n))
    .toFixed(toFixed)
    .replace(/\.?0+$/, "");

  const [integerPart, decimalPart] = parts.split(".");

  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const formattedDecimal = decimalPart
    ? decimalPart.replace(/(\d{3})/g, "$1 ")
    : "";

  const formattedValue = formattedDecimal
    ? `${formattedInteger}.${formattedDecimal.trim()}`
    : formattedInteger;

  return formattedValue;
};
