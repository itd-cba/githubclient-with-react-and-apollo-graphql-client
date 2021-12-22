import RepositoryList, { REPOSITORY_FRAGMENT } from "../Repository";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import {
  GetRepositoryOfOrganization,
  GetRepositoryOfOrganizationVariables,
} from "./__generated__/GetRepositoryOfOrganization";
import ErrorMessage from "../Error";
import Loading from "../Loading";

const GET_REPOSITORIES_OF_ORGANIZATION = gql`
  query GetRepositoryOfOrganization(
    $organizationName: String!
    $cursor: String
  ) {
    organization(login: $organizationName) {
      repositories(first: 5, after: $cursor) {
        edges {
          node {
            ...Repository
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
  ${REPOSITORY_FRAGMENT}
`;
type Props = {
  organizationName: string;
};
const Organization = ({ organizationName }: Props) => {
  const { data, loading, error, fetchMore } = useQuery<
    GetRepositoryOfOrganization,
    GetRepositoryOfOrganizationVariables
  >(GET_REPOSITORIES_OF_ORGANIZATION, {
    variables: {
      organizationName,
    },
    skip: organizationName === "",
    notifyOnNetworkStatusChange: true,
  });

  if (error) {
    return <ErrorMessage error={error} />;
  }
  const organization = data?.organization;

  if (loading && !organization) return <Loading />;
  if (organization)
    return (
      <RepositoryList
        entry={"organization"}
        loading={loading}
        repositories={organization.repositories}
        fetchMore={fetchMore}
      />
    );
  return null;
};
export default Organization;
