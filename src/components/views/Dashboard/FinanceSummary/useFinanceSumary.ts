import { DEAFULT_YEAR, DEFAULT_MONTH } from "@/constants/list.constants";
import financeServices from "@/services/finance.service";
import { ITransactionSummary, ITransactionTotal } from "@/type/Finance";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

const useFinanceSummary = () => {
  const getTotals = async (): Promise<ITransactionTotal> => {
    const { data } = await financeServices.getTotal(
      `month=${DEFAULT_MONTH}&year=${DEAFULT_YEAR}`
    );
    return data.data;
  };

  const {
    data: transactionTotalData,
    isLoading: isLoadingTransactionTotalData,
  } = useQuery({
    queryKey: ["getTotalTransaction"],
    queryFn: getTotals,
    enabled: true,
  });

  const expenseTotal = useMemo(() => {
    if (transactionTotalData === undefined) return 0;
    return transactionTotalData?.totalExpense;
  }, [transactionTotalData]);

  const incomeTotal = useMemo(() => {
    if (transactionTotalData === undefined) return 0;
    return transactionTotalData?.totalIncome;
  }, [transactionTotalData]);

  const getSummaryByCategories = async (): Promise<ITransactionSummary[]> => {
    const { data } = await financeServices.getSummaryByCategories(
      `month=${DEFAULT_MONTH}&year=${DEAFULT_YEAR}`
    );
    return data.data;
  };

  const {
    data: summaryCategoriesData,
    isLoading: isLoadingSummaryCategoriesData,
  } = useQuery({
    queryKey: ["getSummaryByCategories"],
    queryFn: getSummaryByCategories,
    enabled: true,
  });

  return {
    expenseTotal,
    incomeTotal,
    isLoadingSummaryCategoriesData,
    isLoadingTransactionTotalData,
    summaryCategoriesData,
  };
};

export default useFinanceSummary;
