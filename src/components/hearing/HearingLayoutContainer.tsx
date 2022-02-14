import { CircularProgress, Typography } from "@mui/material";
import { useContext } from "react";
import { useLatestStylingReferencesShow } from "../../hooks/api/UseLatestStylingReferencesShow";
import { StylingReferenceText } from "../../model/hearing/StylingReferenceText";
import { MemberIdContext } from "../context/provider/ContextProvider";
import { HearingLayout } from "./HearingLayout";

export const HearingLayoutContainer = () => {
  const { data, error } = useLatestStylingReferencesShow({
    memberId: useContext(MemberIdContext).state!,
  });
  let referenceTexts: StylingReferenceText[] = [];
  if (data) {
    data.forEach((stylingReference) => {
      referenceTexts.push({
        categoryId: stylingReference.id,
        text: stylingReference.texts.join(),
      });
    });
  }

  if (!data) return <CircularProgress />;
  if (error) return <Typography>{error.message}</Typography>;

  return <HearingLayout response={referenceTexts} />;
};
