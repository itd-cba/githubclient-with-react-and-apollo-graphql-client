import "./style.css";
import { GetIssuesOfRepositories_repository_issues_edges_node as Issue } from "../IssueList/__generated__/GetIssuesOfRepositories";
import Link from "../../Link";

type Props = {
  issue: Issue;
};
const IssueItem = ({ issue }: Props) => {
  return (
    <div className={"IssueItem"}>
      {/*Placeholder to add a show/hide commment button later  */}
      <div className={"IssueItem-content"}>
        <h3>
          <Link href={issue.url}>{issue.title}</Link>
        </h3>
        <div dangerouslySetInnerHTML={{ __html: issue.bodyHTML }} />
        {/* placeholder to render a list of comments later */}
      </div>
    </div>
  );
};

export default IssueItem;
