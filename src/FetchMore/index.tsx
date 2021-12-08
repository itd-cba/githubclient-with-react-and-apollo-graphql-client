import { QueryResult } from "@apollo/client";
import React, { PropsWithChildren } from "react";
import { OperationVariables } from "@apollo/client/core/types";
import { FetchMoreOptions } from "@apollo/client/core/ObservableQuery";
import "./style.css";
import { ButtonUnobtrusive } from "../Button";
import Loading from "../Loading";

type Props<TData, TVariables> = {
  hasNextPage: boolean;
  variables: QueryResult<TData, TVariables>["variables"];
  fetchMore: QueryResult<TData, TVariables>["fetchMore"];
  updateQuery: FetchMoreOptions<TData, TVariables>["updateQuery"];
  loading: boolean;
};
function FetchMore<TData = any, TVars = OperationVariables>({
  variables,
  updateQuery,
  fetchMore,
  children,
  loading,
  hasNextPage,
}: PropsWithChildren<Props<TData, TVars>>) {
  return (
    <div className={"FetchMore"}>
      {loading ? (
        <Loading />
      ) : (
        hasNextPage && (
          <ButtonUnobtrusive
            type={"button"}
            className={"FetchMore-button"}
            onClick={() => fetchMore({ variables, updateQuery })}
          >
            More {children}
          </ButtonUnobtrusive>
        )
      )}
    </div>
  );
}

export default FetchMore;
