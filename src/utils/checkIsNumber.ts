export const checkIsNumber = (query: string): RegExpMatchArray | null =>
  query.match(/^[0-9]+$/);
