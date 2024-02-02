import { useMemo } from "react";

/* 
  implement with callback getStartToEnd(1, 3)
    end - start = (3 - 1) = 2 + 1
      reason we need + 1, because i don't want using like index [0,1,2] i want [1,2,3]
    the end we return to increase index

    index: [0]  start: [1] // 0+1
    index: [1]  start: [1] // 1+1
    index: [2]  start: [1] // 2+1
*/
const getStartToEnd = (start: number, end: number): number[] => {
  return Array.from(
    {
      length: end - start + 1,
    },
    (_, index) => index + start
  );
};

interface usePaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  amount: number;
}
/*
      Case 1:The number of pages < the page numbers want to show =>return the range [1..totalPageCount]
      Case 2:No left dots to show, but rights dots to be shown
      Case 3: No right dots to show, but left dots to be shown
      Case 4: Middle Show

*/

interface IUsePagination {
  onClickPage: (page: number | string) => void;
  data: (string | number)[];
}

export default function usePagination({
  currentPage,
  setCurrentPage,
  amount,
}: usePaginationProps): IUsePagination {
  const data = useMemo((): (string | number)[] => {
    const shouldShowLeftDots = currentPage - 1 >= 2;
    const shouldShowRightDots = currentPage + 1 <= amount - 1;
    const siblingCount = 4;
    if (amount <= siblingCount) {
      return [...getStartToEnd(1, amount)];
    }
    return shouldShowLeftDots
      ? (function (): (string | number)[] {
          const middleRange = getStartToEnd(currentPage - 1, currentPage + 1);
          const endRange = getStartToEnd(amount - siblingCount + 1, amount);
          const checkHasEndPage =
            shouldShowRightDots && amount - currentPage > siblingCount
              ? currentPage < siblingCount
                ? [...getStartToEnd(1, siblingCount), "...", amount]
                : [1, "...", ...middleRange, "...", amount]
              : amount - currentPage < siblingCount - 1
                ? [1, "...", ...endRange]
                : [1, "...", ...middleRange, "...", amount];
          /*    console.log('Should Left', ...checkHasEndPage); */
          return [...checkHasEndPage];
        })()
      : (function (): (string | number)[] {
          const shouldRange =
            amount <= siblingCount
              ? [...getStartToEnd(1, amount)]
              : [...getStartToEnd(1, siblingCount), "...", amount];
          /*  console.log('should range', shouldRange); */
          return shouldRange;
        })();
  }, [amount, currentPage]);
  /* console.log('Data Need', data); */
  const onClickPage = (page: number | string): void => {
    if (typeof page === "number") {
      setCurrentPage(page);
    }
  };

  return {
    onClickPage,
    data,
  };
}
