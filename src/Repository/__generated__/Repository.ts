/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SubscriptionState } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: Repository
// ====================================================

export interface Repository_primaryLanguage {
  __typename: "Language";
  /**
   * The name of the current language.
   */
  name: string;
}

export interface Repository_owner {
  __typename: "Organization" | "User";
  /**
   * The username used to login.
   */
  login: string;
  /**
   * The HTTP URL for the owner.
   */
  url: any;
}

export interface Repository_stargazers {
  __typename: "StargazerConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  totalCount: number;
}

export interface Repository_watchers {
  __typename: "UserConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  totalCount: number;
}

export interface Repository {
  __typename: "Repository";
  id: string;
  /**
   * The name of the repository.
   */
  name: string;
  /**
   * The HTTP URL for this repository
   */
  url: any;
  /**
   * The description of the repository rendered to HTML.
   */
  descriptionHTML: any;
  /**
   * The primary language of the repository's code.
   */
  primaryLanguage: Repository_primaryLanguage | null;
  /**
   * The User owner of the repository.
   */
  owner: Repository_owner;
  /**
   * A list of users who have starred this starrable.
   */
  stargazers: Repository_stargazers;
  /**
   * Returns a boolean indicating whether the viewing user has starred this starrable.
   */
  viewerHasStarred: boolean;
  /**
   * A list of users watching the repository.
   */
  watchers: Repository_watchers;
  /**
   * Identifies if the viewer is watching, not watching, or ignoring the subscribable entity.
   */
  viewerSubscription: SubscriptionState | null;
}
