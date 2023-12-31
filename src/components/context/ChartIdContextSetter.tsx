import { ReactNode, useContext, useEffect } from "react";
import { useRouteQuery } from "../../hooks/router/useRouteQuery";
import { ChartIdContext } from "./provider/ContextProvider";
import { validatedId } from "./validatedId";

type TProps = {
  children: ReactNode;
};

export const ChartIdContextSetter = ({ children }: TProps) => {
  const setChartId = useContext(ChartIdContext).setter;

  const routeQuery = useRouteQuery();
  const qsChartId = validatedId(routeQuery.get("chartId"));

  useEffect(() => {
    setChartId(qsChartId);
  }, [qsChartId, setChartId]);

  return <>{children}</>;
};
