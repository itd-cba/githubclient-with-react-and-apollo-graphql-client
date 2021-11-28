/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetRepo
// ====================================================

export interface GetRepo_repository_watchers {
  __typename: "UserConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  totalCount: number;
}

export interface GetRepo_repository {
  __typename: "Repository";
  id: string;
  /**
   * A list of users watching the repository.
   */
  watchers: GetRepo_repository_watchers;
}

export interface GetRepo {
  /**
   * Lookup a given repository by the owner and repository name.
   */
  repository: GetRepo_repository | null;
}

export interface GetRepoVariables {
  owner: string;
  reponame: string;
}
