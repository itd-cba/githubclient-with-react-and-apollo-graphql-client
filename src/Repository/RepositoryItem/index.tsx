import Link from "../../Link";
import { GetRepositoriesOfCurrentUser_viewer_repositories_edges_node } from "../../Profile/__generated__/GetRepositoriesOfCurrentUser";
import "../style.css";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import {
  StarRepository,
  StarRepositoryVariables,
} from "./__generated__/StarRepository";
import Button from "../../Button";
import {
  UpdateSubscription,
  UpdateSubscriptionVariables,
} from "./__generated__/UpdateSubscription";
import { SubscriptionState } from "../../__generated__/globalTypes";

interface Props
  extends GetRepositoriesOfCurrentUser_viewer_repositories_edges_node {}

const STAR_REPOSITORY = gql`
  mutation StarRepository($id: ID!) {
    addStar(input: { starrableId: $id }) {
      starrable {
        __typename
        id
        viewerHasStarred
        __typename
        stargazers {
          totalCount
        }
      }
    }
  }
`;

const REMOVE_STAR_REPOSITORY = gql`
  mutation RemoveStarRepository($id: ID!) {
    removeStar(input: { starrableId: $id }) {
      starrable {
        __typename
        id
        viewerHasStarred
        stargazers {
          __typename
          totalCount
        }
      }
    }
  }
`;

const UPDATE_SUBSCRIPTION = gql`
  mutation UpdateSubscription($id: ID!, $state: SubscriptionState!) {
    updateSubscription(input: { subscribableId: $id, state: $state }) {
      subscribable {
        __typename
        id
        viewerSubscription
      }
    }
  }
`;

const GET_REPOSITORY = gql`
  query GetRepo($owner: String!, $reponame: String!) {
    repository(name: $reponame, owner: $owner) {
      __typename
      id
      watchers {
        __typename
        totalCount
      }
    }
  }
`;

const RepositoryItem = ({
  id,
  name,
  url,
  descriptionHTML,
  primaryLanguage,
  owner,
  stargazers,
  watchers,
  viewerSubscription,
  viewerHasStarred,
}: Props) => {
  const [addStar, { data, loading, error }] = useMutation<
    StarRepository,
    StarRepositoryVariables
  >(STAR_REPOSITORY, {
    variables: { id },
  });

  const [removeStar] = useMutation<StarRepository, StarRepositoryVariables>(
    REMOVE_STAR_REPOSITORY,
    {
      variables: { id },
    }
  );

  const [updateSubscription] = useMutation<
    UpdateSubscription,
    UpdateSubscriptionVariables
  >(UPDATE_SUBSCRIPTION, {
    variables: {
      id,
      state:
        viewerSubscription === SubscriptionState.UNSUBSCRIBED
          ? SubscriptionState.SUBSCRIBED
          : SubscriptionState.UNSUBSCRIBED,
    },
  });

  return (
    <div>
      <div className="RepositoryItem-title">
        <h2>
          <Link href={url}>{name}</Link>
        </h2>

        <div>
          {!viewerHasStarred ? (
            <Button className={"RepositoryItem-title-action"} onClick={addStar}>
              {stargazers.totalCount} Stars
            </Button>
          ) : (
            <Button
              className={"RepositoryItem-title-action"}
              onClick={removeStar}
            >
              {stargazers.totalCount} Stars
            </Button>
          )}
          <Button
            className={"RepositoryItem-title-action"}
            onClick={updateSubscription}
          >
            {watchers.totalCount} Watchers
          </Button>
        </div>
      </div>

      <div className={"RepositoryItem-description"}>
        <div
          className={"RepositoryItem-description-info"}
          dangerouslySetInnerHTML={{ __html: descriptionHTML }}
        />
        <div className={"RepositoryItem-description-details"}>
          <div>
            {primaryLanguage && <span>Language: {primaryLanguage.name}</span>}
          </div>
          <div>
            {owner && (
              <span>
                Owner: <a href={owner.url}>{owner.login}</a>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepositoryItem;
