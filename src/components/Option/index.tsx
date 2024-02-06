"use client";

import s from "./style.module.scss";

interface IOption extends React.HTMLProps<HTMLOptionElement> {
  children: string;
}

export default function Option({
  children,
  ...rest
}: IOption): React.ReactElement {
  return (
    <option {...rest} className={s.option}>
      {children}
    </option>
  );
}
