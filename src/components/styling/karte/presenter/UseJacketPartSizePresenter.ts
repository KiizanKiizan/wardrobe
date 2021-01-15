import JacketPartSizeResponse from "../../../../model/api/response/styling/karte/JacketPartSizeResponse";

export interface JacketPartSizeElement {
  label: string;
  size: string;
}

export interface JacketPartSizePresenter {
  resultList: () => JacketPartSizeElement[];
}

export const useJacketPartSizePresenter = (
  data: JacketPartSizeResponse
): JacketPartSizePresenter => {
  const resultList = (): JacketPartSizeElement[] => {
    return [
      {
        label: "サイズ",
        size: `${data.size ?? ""}：${data.dropSize}`,
      },
      { label: "肩幅", size: `${data.shoulder ?? ""}` },
      { label: "バスト", size: `${data.bust ?? ""}` },
      { label: "着丈", size: `${data.lengthTop ?? ""}` },
      { label: "袖丈", size: `${data.lengthArm ?? ""}` },
    ];
  };

  return { resultList };
};