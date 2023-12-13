import { ReactNode } from "react";
import "./ErrorMessage.css";

interface Props {
  children?: ReactNode;
}

export const ErrorMessage = ({ children }: Props) => {
  return <span className="msg">{children}</span>;
};
