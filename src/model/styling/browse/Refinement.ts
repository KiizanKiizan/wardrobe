import ValueRefinement from "./ValueRefinement";

export default interface Refinement {
  readonly largeCategoryId: number | null;
  readonly mediumCategoryId: number | null;
  readonly smallCategoryIds: number[];
  readonly sizeIds: number[];
  readonly partSizes: ValueRefinement[];
  readonly colorIds: number[];
  readonly patternIds: number[];
  readonly logoIds: number[];
  readonly optionIds: number[];
  readonly sortId: number;
  readonly pageNo: number;
}