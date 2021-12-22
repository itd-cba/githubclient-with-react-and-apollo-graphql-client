import "./style.css";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import {
  GetIssuesOfRepositories,
  GetIssuesOfRepositories_repository,
  GetIssuesOfRepositories_repository_issues,
  GetIssuesOfRepositories_repository_issues_edges,
  GetIssuesOfRepositoriesVariables,
} from "./__generated__/GetIssuesOfRepositories";
import ErrorMessage from "../../Error";
import Loading from "../../Loading";
import IssueItem from "../IssueItem";
import { SetStateAction, useState } from "react";
import { ButtonUnobtrusive } from "../../Button";

enum ISSUE_STATES {
  NONE = "NONE",
  OPEN = "OPEN",
  CLOSED = "CLOSED",
}

const TRANSITION_LABELS = {
  [ISSUE_STATES.NONE]: "Show Open Issues",
  [ISSUE_STATES.OPEN]: "Show Closed Issues",
  [ISSUE_STATES.CLOSED]: "Hide Issues",
};
const TRANSITION_STATE = {
  [ISSUE_STATES.NONE]: ISSUE_STATES.OPEN,
  [ISSUE_STATES.OPEN]: ISSUE_STATES.CLOSED,
  [ISSUE_STATES.CLOSED]: ISSUE_STATES.NONE,
};

const isShow = (issueState: ISSUE_STATES) => issueState !== ISSUE_STATES.NONE;

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
  const [issueState, setIssueState] = useState<ISSUE_STATES>(ISSUE_STATES.NONE);

  const onChangeIssueState = (nextIssueState: SetStateAction<ISSUE_STATES>) =>
    setIssueState(nextIssueState);

  const { data, loading, error } = useQuery<
    GetIssuesOfRepositories,
    GetIssuesOfRepositoriesVariables
  >(GET_ISSUES_OF_REPOSITORIES, {
    variables: { repositoryName, repositoryOwner },
    skip: !isShow(issueState),
  });

  if (error) {
    return <ErrorMessage error={error} />;
  }

  const repository = data?.repository;

  if (loading && !repository) {
    return <Loading />;
  }
  const filteredRepositories = {
    issues: {
      edges: repository?.issues.edges?.filter(
        (issue) => issue?.node?.state === issueState.toString()
      ),
    },
  } as GetIssuesOfRepositories_repository;

  return (
    <div className={"Issues"}>
      <ButtonUnobtrusive
        onClick={() => onChangeIssueState(TRANSITION_STATE[issueState])}
      >
        {TRANSITION_LABELS[issueState]}
      </ButtonUnobtrusive>
      {isShow(issueState) &&
        (!filteredRepositories?.issues.edges?.length ? (
          <div className={"IssueList"}>No issues</div>
        ) : (
          <IssueList issues={filteredRepositories.issues} />
        ))}
    </div>
  );
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
