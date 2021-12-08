import "./style.css";
import React from "react";
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

const ButtonUnobtrusive: React.FC<Props> = ({
  children,
  className,
  type = "button",
  ...props
}) => (
  <button className={`${className} Button_unobtrusive`} type={type} {...props}>
    {children}
  </button>
);
export { ButtonUnobtrusive };
export default Button;
