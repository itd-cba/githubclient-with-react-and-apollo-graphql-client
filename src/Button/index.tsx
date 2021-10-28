import "./style.css";
import React, { ButtonHTMLAttributes } from "react";
type Props = {
  className: string;
  color?: string;
  type?: "submit" | "reset" | "button";
  onClick: () => void;
};
const Button: React.FC<Props> = ({
  children,
  className,
  color = "black",
  type = "button",
  ...props
}) => {
  return (
    <button
      className={`${className} Button Button_${color}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
