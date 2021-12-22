import "./style.css";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import {
  GetIssuesOfRepositories,
  GetIssuesOfRepositories_repository_issues,
  GetIssuesOfRepositories_repository_issues_edges,
  GetIssuesOfRepositoriesVariables,
} from "./__generated__/GetIssuesOfRepositories";
import ErrorMessage from "../../Error";
import Loading from "../../Loading";
import IssueItem from "../IssueItem";

const GET_ISSUES_OF_REPOSITORIES = gql`
  query GetIssuesOfRepositories(
    $repositoryOwner: String!
    $repositoryName: String!
  ) {
    repository(name: $repositoryName, owner: $repositoryOwner) {
      issues(first: 5) {
        edges {
          node {
            id
            state
            number
            title
            url
            bodyHTML
          }
        }
      }
    }
  }
`;
type Props = {
  repositoryOwner: string;
  repositoryName: string;
};
const Issues = ({ repositoryOwner, repositoryName }: Props) => {
  const { data, loading, error } = useQuery<
    GetIssuesOfRepositories,
    GetIssuesOfRepositoriesVariables
  >(GET_ISSUES_OF_REPOSITORIES, {
    variables: { repositoryName, repositoryOwner },
  });

  if (error) {
    return <ErrorMessage error={error} />;
  }

  const repository = data?.repository;

  if (loading && !repository) {
    return <Loading />;
  }
  if (!repository?.issues.edges?.length)
    return <div className={"IssueList"}>No issues</div>;

  return <IssueList issues={repository.issues} />;
};

type IssueListProps = {
  issues: GetIssuesOfRepositories_repository_issues;
};
const IssueList = ({ issues }: IssueListProps) => {
  return (
    <div className={"IssueList"}>
      {issues.edges &&
        (issues.edges as GetIssuesOfRepositories_repository_issues_edges[]).map(
          ({ node }) => {
            if (node) return <IssueItem key={node.id} issue={node} />;
            return null;
          }
        )}
    </div>
  );
};

export default Issues;
