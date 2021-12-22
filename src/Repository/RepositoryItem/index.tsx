import Link from "../../Link";
import { GetRepositoriesOfCurrentUser_viewer_repositories_edges_node } from "../../Profile/__generated__/GetRepositoriesOfCurrentUser";
import "../style.css";
import gql from "graphql-tag";
import { ApolloCache, useMutation } from "@apollo/client";
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
import REPOSITORY_FRAGMENT from "../fragments";
import { Repository } from "../__generated__/Repository";
import { RemoveStarRepository } from "./__generated__/RemoveStarRepository";

interface Props
  extends GetRepositoriesOfCurrentUser_viewer_repositories_edges_node {}

const STAR_REPOSITORY = gql`
  mutation StarRepository($id: ID!) {
    addStar(input: { starrableId: $id }) {
      starrable {
        __typename
        id
        viewerHasStarred
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

const updateStars = (
  cache: ApolloCache<any>,
  mutationResult: StarRepository | RemoveStarRepository,
  id: string
) => {
  const cachedRepository = cache.readFragment<Repository>({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
  });
  if (cachedRepository) {
    const oldCount = cachedRepository.stargazers.totalCount;
    let totalCount = oldCount;
    if ("addStar" in mutationResult) {
      totalCount = mutationResult.addStar?.starrable?.viewerHasStarred
        ? oldCount + 1
        : oldCount - 1;
    } else if ("removeStar" in mutationResult) {
      totalCount = mutationResult.removeStar?.starrable?.viewerHasStarred
        ? oldCount + 1
        : oldCount - 1;
    }
    cache.writeFragment<Repository>({
      id: `Repository:${id}`,
      fragment: REPOSITORY_FRAGMENT,
      data: {
        ...cachedRepository,
        stargazers: {
          ...cachedRepository.stargazers,
          totalCount,
        },
      },
    });
  }
};

const updateWatchers = (
  cache: ApolloCache<any>,
  mutationResult: UpdateSubscription,
  id: string
) => {
  const cachedRepository = cache.readFragment<
    Repository,
    StarRepositoryVariables
  >({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
  });
  if (cachedRepository) {
    const oldCount = cachedRepository.watchers.totalCount;
    let totalCount =
      mutationResult.updateSubscription?.subscribable?.viewerSubscription ===
      SubscriptionState.SUBSCRIBED
        ? oldCount + 1
        : oldCount - 1;
    cache.writeFragment<Repository>({
      id: `Repository:${id}`,
      fragment: REPOSITORY_FRAGMENT,
      data: {
        ...cachedRepository,
        watchers: {
          ...cachedRepository.watchers,
          totalCount,
        },
      },
    });
  }
};

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
    update(cache, { data }) {
      if (data) updateStars(cache, data, id);
    },
    optimisticResponse: {
      addStar: {
        __typename: "AddStarPayload",
        starrable: {
          id,
          __typename: "Repository",
          viewerHasStarred: true,
        },
      },
    },
  });

  const [removeStar] = useMutation<StarRepository, StarRepositoryVariables>(
    REMOVE_STAR_REPOSITORY,
    {
      variables: { id },
      update(cache, { data }) {
        if (data) updateStars(cache, data, id);
      },
      optimisticResponse: {
        addStar: {
          __typename: "AddStarPayload",
          starrable: {
            id,
            __typename: "Repository",
            viewerHasStarred: false,
          },
        },
      },
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
    update(cache, { data }) {
      if (data) updateWatchers(cache, data, id);
    },
    optimisticResponse: {
      updateSubscription: {
        __typename: "UpdateSubscriptionPayload",
        subscribable: {
          id,
          __typename: "Repository",
          viewerSubscription:
            viewerSubscription === SubscriptionState.UNSUBSCRIBED
              ? SubscriptionState.SUBSCRIBED
              : SubscriptionState.UNSUBSCRIBED,
        },
      },
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
              {stargazers.totalCount} Unstar
            </Button>
          )}
          <Button
            className={"RepositoryItem-title-action"}
            onClick={updateSubscription}
          >
            {watchers.totalCount}{" "}
            {viewerSubscription === SubscriptionState.UNSUBSCRIBED
              ? "Watch"
              : "Unwatch"}
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
