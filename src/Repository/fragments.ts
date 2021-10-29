import gql from "graphql-tag";

const REPOSITORY_FRAGMENT = gql`
  fragment Repository on Repository {
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
`;

export default REPOSITORY_FRAGMENT;
