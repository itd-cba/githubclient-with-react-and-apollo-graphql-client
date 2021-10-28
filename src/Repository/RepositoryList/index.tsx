import { GetRepositoriesOfCurrentUser_viewer_repositories } from "../../Profile/__generated__/GetRepositoriesOfCurrentUser";
import RepositoryItem from "../RepositoryItem";
import "../style.css";

type Props = {
  repositories: GetRepositoriesOfCurrentUser_viewer_repositories;
};

const RepositoryList = ({ repositories }: Props): JSX.Element => {
  return (
    <>
      {repositories.edges!.map((edge) => (
        <div key={edge?.node?.id} className={"RepositoryItem"}>
          <RepositoryItem {...edge?.node!} />
        </div>
      ))}
    </>
  );
};
export default RepositoryList;
