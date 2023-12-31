export interface OutfitFormData {
  readonly items: {
    readonly itemId: number;
    readonly itemImagePath: string;
    readonly categoryName: string;
    readonly isSelected: boolean;
    readonly isChangeItem: boolean;
  }[];
  readonly selectedAdviceIds: (number | null)[];
  readonly formalLevel: number;
}
