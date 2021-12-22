import { QueryResult } from "@apollo/client";
import React, { PropsWithChildren } from "react";
import { FetchMoreOptions } from "@apollo/client/core/ObservableQuery";
import "./style.css";
import { ButtonUnobtrusive } from "../Button";
import Loading from "../Loading";

type Props = {
  hasNextPage: boolean;
  variables: QueryResult["variables"];
  fetchMore: QueryResult["fetchMore"];
  updateQuery: FetchMoreOptions["updateQuery"];
  loading: boolean;
};
function FetchMore({
  variables,
  updateQuery,
  fetchMore,
  children,
  loading,
  hasNextPage,
}: PropsWithChildren<Props>) {
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
