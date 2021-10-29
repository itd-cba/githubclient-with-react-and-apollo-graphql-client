import gql from "graphql-tag";
import { useQuery } from "@apollo/client";

import Loading from "../Loading";
import { GetRepositoriesOfCurrentUser } from "./__generated__/GetRepositoriesOfCurrentUser";
import RepositoryList, { REPOSITORY_FRAGMENT } from "../Repository";
import ErrorMessage from "../Error";

const GET_REPOSITORIES_OF_CURRENT_USER = gql`
  query GetRepositoriesOfCurrentUser {
    viewer {
      repositories(first: 5, orderBy: { direction: DESC, field: STARGAZERS }) {
        edges {
          node {
            ...Repository
          }
        }
      }
    }
  }
  ${REPOSITORY_FRAGMENT}
`;

const Profile = () => {
  const { loading, error, data } = useQuery<GetRepositoriesOfCurrentUser>(
    GET_REPOSITORIES_OF_CURRENT_USER
  );
  if (error) {
    return <ErrorMessage error={error} />;
  }
  const viewer = data?.viewer;

  if (loading || !viewer) return <Loading />;

  return <RepositoryList repositories={viewer.repositories} />;
};

export default Profile;
