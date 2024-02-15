export const formatBigNumber = (value: number, toFixed: number = 9): string => {
  return (Number(value) / Number(10n ** 18n))
    .toFixed(toFixed)
    .replace(/\.?0+$/, "");
};
