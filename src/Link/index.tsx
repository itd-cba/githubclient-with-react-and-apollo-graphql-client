import React from "react";

type Props = {
  href: string;
};

const Link: React.FC<Props> = ({ children, ...props }) => {
  return (
    <a {...props} target={"_blank"} rel={"noopener noreferrer"}>
      {children}
    </a>
  );
};

export default Link;
