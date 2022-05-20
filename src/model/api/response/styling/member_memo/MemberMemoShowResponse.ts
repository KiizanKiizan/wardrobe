import { TNextCoordeHearing } from "./NextCoordeHearing";

export interface MemberMemoShowResponse {
  readonly memo: string;
  readonly memoNext: string;
  readonly lineSurveyNext: string | null;
  readonly nextCoordeHearing: TNextCoordeHearing;
}
