export interface ReputationListResponse {
  reputations?: Array<ReputationResponse>;
}

export interface ReputationResponse {
  name?: string;
  faction?: string;
  expansion?: string;
  standing?: string;
  current: number;
  max: number;
}
