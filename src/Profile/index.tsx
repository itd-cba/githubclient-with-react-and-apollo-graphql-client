import gql from "graphql-tag";
import { useQuery } from "@apollo/client";

import Loading from "../Loading";
import { GetRepositoriesOfCurrentUser } from "./__generated__/GetRepositoriesOfCurrentUser";
import RepositoryList, { REPOSITORY_FRAGMENT } from "../Repository";
import ErrorMessage from "../Error";

const GET_REPOSITORIES_OF_CURRENT_USER = gql`
  query GetRepositoriesOfCurrentUser($cursor: String) {
    viewer {
      repositories(
        first: 2
        orderBy: { direction: DESC, field: STARGAZERS }
        after: $cursor
      ) {
        edges {
          node {
            ...Repository
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
  ${REPOSITORY_FRAGMENT}
`;

const Profile = () => {
  const { loading, error, data, fetchMore } =
    useQuery<GetRepositoriesOfCurrentUser>(GET_REPOSITORIES_OF_CURRENT_USER, {
      notifyOnNetworkStatusChange: true,
    });
  if (error) {
    return <ErrorMessage error={error} />;
  }
  const viewer = data?.viewer;

  if (loading && !viewer) return <Loading />;
  if (viewer)
    return (
      <RepositoryList
        loading={loading}
        repositories={viewer.repositories}
        fetchMore={fetchMore}
      />
    );
  return null;
};

export default Profile;
