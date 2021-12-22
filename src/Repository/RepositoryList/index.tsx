import { GetRepositoriesOfCurrentUser_viewer_repositories } from "../../Profile/__generated__/GetRepositoriesOfCurrentUser";
import RepositoryItem from "../RepositoryItem";
import "../style.css";
import { QueryResult } from "@apollo/client";
import FetchMore from "../../FetchMore";

type Props = {
  repositories: GetRepositoriesOfCurrentUser_viewer_repositories;
  fetchMore: QueryResult["fetchMore"];
  loading: boolean;
  entry: "organization" | "viewer";
};

const getUpdateQuery =
  (entry: Props["entry"]) =>
  (previousResult: any, { fetchMoreResult }: any) => {
    if (!fetchMoreResult) return previousResult;
    return {
      ...previousResult,
      [entry]: {
        ...previousResult[entry],
        repositories: {
          ...previousResult[entry].repositories,
          ...fetchMoreResult[entry].repositories,
          edges: [
            ...previousResult[entry].repositories.edges,
            ...fetchMoreResult[entry].repositories.edges,
          ],
        },
      },
    };
  };

const RepositoryList = ({
  repositories,
  fetchMore,
  loading,
  entry,
}: Props): JSX.Element => {
  return (
    <>
      {repositories.edges?.map((edge) => (
        <div key={edge?.node?.id} className={"RepositoryItem"}>
          <RepositoryItem {...edge?.node!} />
        </div>
      ))}
      <FetchMore
        variables={{ cursor: repositories.pageInfo.endCursor }}
        fetchMore={fetchMore}
        updateQuery={getUpdateQuery(entry)}
        loading={loading}
        hasNextPage={repositories.pageInfo.hasNextPage}
      >
        Repositories
      </FetchMore>
    </>
  );
};
export default RepositoryList;
