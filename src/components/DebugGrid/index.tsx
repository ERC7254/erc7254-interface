"use client";
import React, { useCallback, useEffect, useState } from "react";

import Container from "../Container";
import s from "./style.module.scss";

export default function DebugGrid(): React.ReactElement {
  const [isGird, setIsGrid] = useState(false);
  const handleKeyDown: (ev: KeyboardEvent) => void = useCallback(
    (ev: KeyboardEvent) => {
      const key = ev.which || ev.keyCode;
      const isShift = !!ev.shiftKey;
      if (isShift && key === 71) {
        localStorage.setItem("isGrid", String(!isGird));
        setIsGrid(!isGird);
      }
    },
    [isGird],
  );

  useEffect(() => {
    const localIsGrid = localStorage.getItem("isGrid");
    if (localIsGrid === "true") {
      setIsGrid(true);
    }
    window.addEventListener("keydown", handleKeyDown);
    return (): void => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, isGird]);

  return (
    <div className={`${s.gridDebug} ${isGird ? "" : "hidden"}`}>
      <Container>
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12">
          <div className={`col-span-1 ${s.debug_col}`} />
          <div className={`col-span-1 ${s.debug_col}`} />
          <div className={`col-span-1 ${s.debug_col}`} />
          <div className={`col-span-1 ${s.debug_col}`} />
          <div className={`col-span-1 ${s.debug_col}`} />
          <div className={`col-span-1 ${s.debug_col}`} />
          <div className={`col-span-1 ${s.debug_col}`} />
          <div className={`col-span-1 ${s.debug_col}`} />
          {/* <div className={cx('debug_col', 'xs:hidden sm:block col-span-1')} />
          <div className={cx('debug_col', 'xs:hidden sm:block col-span-1')} /> */}
          <div className={`${s.debug_col} xs:hidden sm:block col-span-1`} />
          <div className={`${s.debug_col} xs:hidden sm:block col-span-1`} />
          <div className={`${s.debug_col} xs:hidden sm:block col-span-1`} />
          <div className={`${s.debug_col} xs:hidden sm:block col-span-1`} />
        </div>
      </Container>
    </div>
  );
}
