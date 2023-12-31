import { MemberImageResponse } from "./MemberImageResponse";

export interface MemberShowResponse {
  readonly id: number;
  readonly name: string;
  readonly memberImages: MemberImageResponse[];
  readonly age: number;
  readonly pref: string;
  readonly aboutSize: string | null;
  readonly planName: string;
  readonly isLeeapPlan: boolean;
  readonly isSuspended: boolean;
}
