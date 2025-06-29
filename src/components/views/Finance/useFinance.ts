import financeServices from "@/services/finance.service";
import { ITransaction } from "@/type/Finance";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useFinance = () => {
  const [financeType, setFinanceType] = useState<"" | "income" | "expense">("");
  const [selectedId, setSelectedId] = useState<string>("");

  const getTransactions = async (): Promise<ITransaction[]> => {
    const { data } = await financeServices.getTransactions();
    return data.data;
  };

  const {
    data: transactionData,
    isPending: isPendingTransactions,
    refetch: refetchTransactions,
  } = useQuery({
    queryKey: ["getTransactions"],
    queryFn: getTransactions,
    enabled: true,
  });

  return {
    financeType,
    isPendingTransactions,
    refetchTransactions,
    selectedId,
    setFinanceType,
    setSelectedId,
    transactionData,
  };
};

export default useFinance;
