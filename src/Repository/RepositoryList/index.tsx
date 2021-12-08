import {
  GetRepositoriesOfCurrentUser,
  GetRepositoriesOfCurrentUser_viewer_repositories,
  GetRepositoriesOfCurrentUserVariables,
} from "../../Profile/__generated__/GetRepositoriesOfCurrentUser";
import RepositoryItem from "../RepositoryItem";
import "../style.css";
import { QueryResult } from "@apollo/client";
import FetchMore from "../../FetchMore";

type Props = {
  repositories: GetRepositoriesOfCurrentUser_viewer_repositories;
  fetchMore: QueryResult<
    GetRepositoriesOfCurrentUser,
    GetRepositoriesOfCurrentUserVariables
  >["fetchMore"];
  loading: boolean;
};
const updateQuery = (previousResult: any, { fetchMoreResult }: any) => {
  if (!fetchMoreResult) return previousResult;
  return {
    ...previousResult,
    viewer: {
      ...previousResult.viewer,
      repositories: {
        ...previousResult.viewer.repositories,
        ...fetchMoreResult.viewer.repositories,
        edges: [
          ...previousResult.viewer.repositories.edges,
          ...fetchMoreResult.viewer.repositories.edges,
        ],
      },
    },
  };
};
const RepositoryList = ({
  repositories,
  fetchMore,
  loading,
}: Props): JSX.Element => {
  return (
    <>
      {repositories.edges?.map((edge) => (
        <div key={edge?.node?.id} className={"RepositoryItem"}>
          <RepositoryItem {...edge?.node!} />
        </div>
      ))}
      <FetchMore<
        GetRepositoriesOfCurrentUser,
        GetRepositoriesOfCurrentUserVariables
      >
        variables={{ cursor: repositories.pageInfo.endCursor }}
        fetchMore={fetchMore}
        updateQuery={updateQuery}
        loading={loading}
        hasNextPage={repositories.pageInfo.hasNextPage}
      >
        Repositories
      </FetchMore>
    </>
  );
};
export default RepositoryList;
