import React from "react";
import "./style.css";

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.FC<Props> = ({ children, color = "black", ...props }) => (
  <input {...props} className={`Input Input_${color}`}>
    {children}
  </input>
);
export default Input;
