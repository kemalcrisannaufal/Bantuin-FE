import financeServices from "@/services/finance.service";
import { ITransaction, ITransactionForm } from "@/type/Finance";
import { toDateStandard } from "@/utils/date";
import { addToast, DateValue } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const updateFinanceSchema = Yup.object().shape({
  name: Yup.string().required(),
  description: Yup.string().required(),
  amount: Yup.string().required(),
  date: Yup.mixed<DateValue>().required(),
  category: Yup.string().required(),
});

const useUpdateFinanceModal = (id: string, enableUpdate: boolean) => {
  const getTransactionById = async (): Promise<ITransaction> => {
    const { data } = await financeServices.getTransactionById(id);
    return data.data;
  };

  const {
    data: transactionDetailData,
    isLoading: isLoadingTransactionDetailData,
  } = useQuery({
    queryKey: ["getTransactionById", id],
    queryFn: getTransactionById,
    enabled: id !== "" && enableUpdate,
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm({ resolver: yupResolver(updateFinanceSchema) });

  const updateFinance = async (payload: ITransaction) => {
    const { data } = await financeServices.updateTransaction(payload, id);
    return data.data;
  };

  const {
    mutate: mutateUpdateTransaction,
    isPending: isPendingUpdateTransaction,
    isSuccess: isSuccessUpdateTransaction,
  } = useMutation({
    mutationKey: ["updateFinance"],
    mutationFn: updateFinance,
    onError: (error: IApiError) => {
      addToast({
        title: "Error",
        description: error.response?.data?.meta?.message,
        color: "danger",
        variant: "bordered",
      });
    },
    onSuccess: () => {
      reset();
      addToast({
        title: "Sukses",
        description: "Update transaksi berhasil!",
        color: "success",
        variant: "bordered",
      });
    },
  });

  const handleUpdateTransaction = (payload: ITransactionForm) => {
    const data: ITransaction = {
      name: payload.name,
      description: payload.description,
      amount: Number(payload.amount),
      date: toDateStandard(payload.date),
      category: payload.category,
      type: transactionDetailData!.type,
    };
    mutateUpdateTransaction(data);
  };

  return {
    isLoadingTransactionDetailData,
    transactionDetailData,

    control,
    errors,
    handleSubmit,
    setValue,

    handleUpdateTransaction,
    isPendingUpdateTransaction,
    isSuccessUpdateTransaction,
  };
};

export default useUpdateFinanceModal;
