import { ApolloError } from "@apollo/client";
import "./style.css";
type Props = {
  error: ApolloError;
};

const ErrorMessage = ({ error }: Props) => {
  return (
    <div className={"ErrorMessage"}>
      <small>{error.toString()}</small>
    </div>
  );
};

export default ErrorMessage;
