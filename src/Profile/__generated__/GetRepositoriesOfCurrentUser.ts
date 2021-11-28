/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SubscriptionState } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetRepositoriesOfCurrentUser
// ====================================================

export interface GetRepositoriesOfCurrentUser_viewer_repositories_edges_node_primaryLanguage {
  __typename: "Language";
  /**
   * The name of the current language.
   */
  name: string;
}

export interface GetRepositoriesOfCurrentUser_viewer_repositories_edges_node_owner {
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

export interface GetRepositoriesOfCurrentUser_viewer_repositories_edges_node_stargazers {
  __typename: "StargazerConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  totalCount: number;
}

export interface GetRepositoriesOfCurrentUser_viewer_repositories_edges_node_watchers {
  __typename: "UserConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  totalCount: number;
}

export interface GetRepositoriesOfCurrentUser_viewer_repositories_edges_node {
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
  primaryLanguage: GetRepositoriesOfCurrentUser_viewer_repositories_edges_node_primaryLanguage | null;
  /**
   * The User owner of the repository.
   */
  owner: GetRepositoriesOfCurrentUser_viewer_repositories_edges_node_owner;
  /**
   * A list of users who have starred this starrable.
   */
  stargazers: GetRepositoriesOfCurrentUser_viewer_repositories_edges_node_stargazers;
  /**
   * Returns a boolean indicating whether the viewing user has starred this starrable.
   */
  viewerHasStarred: boolean;
  /**
   * A list of users watching the repository.
   */
  watchers: GetRepositoriesOfCurrentUser_viewer_repositories_edges_node_watchers;
  /**
   * Identifies if the viewer is watching, not watching, or ignoring the subscribable entity.
   */
  viewerSubscription: SubscriptionState | null;
}

export interface GetRepositoriesOfCurrentUser_viewer_repositories_edges {
  __typename: "RepositoryEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetRepositoriesOfCurrentUser_viewer_repositories_edges_node | null;
}

export interface GetRepositoriesOfCurrentUser_viewer_repositories {
  __typename: "RepositoryConnection";
  /**
   * A list of edges.
   */
  edges:
    | (GetRepositoriesOfCurrentUser_viewer_repositories_edges | null)[]
    | null;
}

export interface GetRepositoriesOfCurrentUser_viewer {
  __typename: "User";
  /**
   * A list of repositories that the user owns.
   */
  repositories: GetRepositoriesOfCurrentUser_viewer_repositories;
}

export interface GetRepositoriesOfCurrentUser {
  /**
   * The currently authenticated user.
   */
  viewer: GetRepositoriesOfCurrentUser_viewer;
}
