import gql from "graphql-tag";
import { useQuery } from "@apollo/client";

import Loading from "../Loading";
import { GetRepositoriesOfCurrentUser } from "./__generated__/GetRepositoriesOfCurrentUser";
import RepositoryList from "../Repository/RepositoryList";
import ErrorMessage from "../Error";

const GET_REPOSITORIES_OF_CURRENT_USER = gql`
  query GetRepositoriesOfCurrentUser {
    viewer {
      repositories(first: 5, orderBy: { direction: DESC, field: STARGAZERS }) {
        edges {
          node {
            __typename
            id
            name
            url
            descriptionHTML
            primaryLanguage {
              name
            }
            owner {
              __typename
              login
              url
            }
            stargazers {
              __typename
              totalCount
            }
            viewerHasStarred
            watchers {
              __typename
              totalCount
            }
            viewerSubscription
          }
        }
      }
    }
  }
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
