import { useIsomorphicLayoutEffect } from "@Hooks/common/useIsomorphicLayoutEffect";
import { debounce } from "@Utils/uiHelper";
import { useMemo, useState } from "react";

import { breakpoints } from "@/constants/breakpoints";

interface IDimension {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  scrollHeight: number;
}

const useWindowSize = (): IDimension => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);

  const listener = (): void => {
    setScrollHeight(document.body.scrollHeight);
  };

  const deBounceListener = debounce(listener, 100);
  useIsomorphicLayoutEffect(() => {
    const onResize = (): void => {
      setWidth(window.innerWidth || 0);
      setHeight(window.innerHeight || 0);
      deBounceListener();
    };

    onResize();
    window?.addEventListener?.("resize", onResize);
    return () => {
      window?.removeEventListener?.("resize", onResize);
    };
  }, []);

  return useMemo(() => {
    return {
      width,
      height,
      isMobile: width < breakpoints.md,
      isTablet: width >= breakpoints.md && width < breakpoints.xl,
      isDesktop: width >= breakpoints.xl,
      scrollHeight,
    };
  }, [width, height, scrollHeight]);
};

export default useWindowSize;
