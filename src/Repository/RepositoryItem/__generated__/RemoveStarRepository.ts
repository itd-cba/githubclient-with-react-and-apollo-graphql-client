/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveStarRepository
// ====================================================

export interface RemoveStarRepository_removeStar_starrable {
  __typename: "Gist" | "Repository" | "Topic";
  id: string;
  /**
   * Returns a boolean indicating whether the viewing user has starred this starrable.
   */
  viewerHasStarred: boolean;
}

export interface RemoveStarRepository_removeStar {
  __typename: "RemoveStarPayload";
  /**
   * The starrable.
   */
  starrable: RemoveStarRepository_removeStar_starrable | null;
}

export interface RemoveStarRepository {
  /**
   * Removes a star from a Starrable.
   */
  removeStar: RemoveStarRepository_removeStar | null;
}

export interface RemoveStarRepositoryVariables {
  id: string;
}
