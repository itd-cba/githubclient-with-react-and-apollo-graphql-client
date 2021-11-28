/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: StarRepository
// ====================================================

export interface StarRepository_addStar_starrable {
  __typename: "Gist" | "Repository" | "Topic";
  id: string;
  /**
   * Returns a boolean indicating whether the viewing user has starred this starrable.
   */
  viewerHasStarred: boolean;
}

export interface StarRepository_addStar {
  __typename: "AddStarPayload";
  /**
   * The starrable.
   */
  starrable: StarRepository_addStar_starrable | null;
}

export interface StarRepository {
  /**
   * Adds a star to a Starrable.
   */
  addStar: StarRepository_addStar | null;
}

export interface StarRepositoryVariables {
  id: string;
}
