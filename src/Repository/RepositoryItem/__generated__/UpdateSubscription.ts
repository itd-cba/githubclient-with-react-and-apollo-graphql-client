/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SubscriptionState } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateSubscription
// ====================================================

export interface UpdateSubscription_updateSubscription_subscribable {
  __typename:
    | "Commit"
    | "Discussion"
    | "Issue"
    | "PullRequest"
    | "Repository"
    | "Team"
    | "TeamDiscussion";
  id: string;
  /**
   * Identifies if the viewer is watching, not watching, or ignoring the subscribable entity.
   */
  viewerSubscription: SubscriptionState | null;
}

export interface UpdateSubscription_updateSubscription {
  __typename: "UpdateSubscriptionPayload";
  /**
   * The input subscribable entity.
   */
  subscribable: UpdateSubscription_updateSubscription_subscribable | null;
}

export interface UpdateSubscription {
  /**
   * Updates the state for subscribable subjects.
   */
  updateSubscription: UpdateSubscription_updateSubscription | null;
}

export interface UpdateSubscriptionVariables {
  id: string;
  state: SubscriptionState;
}
