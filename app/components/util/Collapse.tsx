import React from "react";

type Props = {
  head: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export default function Collapse({ head, children, className }: Props) {
  return (
    <div
      tabIndex={0}
      className={`collapse collapse-arrow ${className ? className : ""}`}
    >
      <div className="collapse-title">{head}</div>
      <div className="collapse-content">{children}</div>
    </div>
  );
}
