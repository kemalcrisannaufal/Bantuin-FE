import { DEAFULT_YEAR, DEFAULT_MONTH } from "@/constants/list.constants";
import { LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constants/queryRouter.constants";
import financeServices from "@/services/finance.service";
import {
  ITransaction,
  ITransactionFilter,
  ITransactionSummary,
  ITransactionTotal,
} from "@/type/Finance";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ChangeEvent, useMemo, useState } from "react";

const useFinance = () => {
  const [financeType, setFinanceType] = useState<"" | "income" | "expense">("");
  const [selectedId, setSelectedId] = useState<string>("");
  const [enableAction, setEnableAction] = useState({
    update: false,
    delete: false,
  });
  const [filter, setFilter] = useState<ITransactionFilter>({
    month: DEFAULT_MONTH,
    year: DEAFULT_YEAR,
    category: "",
    type: "",
  });

  const router = useRouter();
  const currentLimit = router.query.limit || LIMIT_DEFAULT;
  const currentPage = router.query.page || PAGE_DEFAULT;
  const currentMonth = router.query.month || filter.month;
  const currentYear = router.query.year || filter.year;
  const currentType = router.query.type;
  const currentCategory = router.query.category;

  const setUrl = () => {
    router.replace({
      query: {
        limit: currentLimit,
        page: currentPage,
        month: currentMonth,
        year: currentYear,
        type: currentType,
        category: currentCategory,
      },
    });
  };

  const handleChangeLimit = (e: ChangeEvent<HTMLSelectElement>) => {
    const limit = e.target.value;
    router.replace({
      query: {
        ...router.query,
        limit,
      },
    });
  };

  const handleChangePage = (page: number) => {
    router.replace({
      query: {
        ...router.query,
        page,
      },
    });
  };

  const handleChangeDate = (
    e: ChangeEvent<HTMLSelectElement>,
    type: "year" | "month"
  ) => {
    const newValue = Number(e.target.value);
    const updatedDate = { ...filter, [type]: newValue };

    setFilter(updatedDate);
    router.replace({
      query: {
        ...router.query,
        ...updatedDate,
        page: PAGE_DEFAULT,
      },
    });
  };

  const handleChangeType = (e: ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value;

    if (type !== "" && type !== "income" && type !== "expense") {
      return;
    }

    setFilter({ ...filter, type });
    router.replace({
      query: {
        ...router.query,
        type,
        page: PAGE_DEFAULT,
      },
    });
  };

  const resetFilter = () => {
    setFilter({
      month: DEFAULT_MONTH,
      year: DEAFULT_YEAR,
      type: "",
      category: "",
    });

    router.replace({
      query: { month: DEFAULT_MONTH, year: DEAFULT_YEAR },
    });
  };

  const handleChangeCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;

    setFilter({ ...filter, category });

    router.replace({
      query: {
        ...router.query,
        category,
        page: PAGE_DEFAULT,
      },
    });
  };

  const getTransactions = async (): Promise<{
    meta: { status: number; message: string };
    data: ITransaction[];
    pagination: { current: number; totalPage: number; total: number };
  }> => {
    const { data } = await financeServices.getTransactions(
      `limit=${currentLimit}&page=${currentPage}&month=${currentMonth}&year=${currentYear}&type=${filter.type}&category=${filter.category}`
    );
    return data;
  };

  const {
    data: transactionData,
    isPending: isPendingTransactions,
    refetch: refetchTransactions,
  } = useQuery({
    queryKey: [
      "getTransactions",
      currentLimit,
      currentPage,
      currentMonth,
      currentYear,
      currentType,
      currentCategory,
    ],
    queryFn: getTransactions,
    enabled: true,
  });

  const getTotals = async (): Promise<ITransactionTotal> => {
    const { data } = await financeServices.getTotal(
      `month=${filter.month}&year=${filter.year}`
    );
    return data.data;
  };

  const {
    data: transactionTotalData,
    isLoading: isLoadingTransactionTotalData,
  } = useQuery({
    queryKey: ["getTotalTransaction", currentMonth, currentYear],
    queryFn: getTotals,
    enabled: true,
  });

  const incomeTotal = useMemo(() => {
    if (transactionTotalData === undefined) return 0;
    return transactionTotalData?.totalIncome;
  }, [transactionTotalData]);

  const expenseTotal = useMemo(() => {
    if (transactionTotalData === undefined) return 0;
    return transactionTotalData?.totalExpense;
  }, [transactionTotalData]);

  const getSummaryByCategories = async (): Promise<ITransactionSummary[]> => {
    const { data } = await financeServices.getSummaryByCategories(
      `month=${currentMonth}&year=${currentYear}`
    );
    return data.data;
  };

  const {
    data: summaryCategoriesData,
    isLoading: isLoadingSummaryCategoriesData,
  } = useQuery({
    queryKey: ["getSummaryByCategories", currentMonth, currentYear],
    queryFn: getSummaryByCategories,
    enabled: true,
  });

  return {
    // Query Router
    currentLimit,
    currentPage,
    handleChangeLimit,
    handleChangePage,
    handleChangeDate,
    handleChangeType,
    handleChangeCategory,
    setUrl,

    //Total
    expenseTotal,
    incomeTotal,
    isLoadingTransactionTotalData,

    // Summary
    isLoadingSummaryCategoriesData,
    summaryCategoriesData,

    // Filter
    filter,
    resetFilter,
    setFilter,

    enableAction,
    financeType,
    isPendingTransactions,
    refetchTransactions,
    selectedId,
    setEnableAction,
    setFinanceType,
    setSelectedId,
    transactionData,
  };
};

export default useFinance;
