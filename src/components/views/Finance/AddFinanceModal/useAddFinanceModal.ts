import financeServices from "@/services/finance.service";
import { ITransaction, ITransactionForm } from "@/type/Finance";
import { toDateStandard } from "@/utils/date";
import { addToast, DateValue } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const addFinanceSchema = Yup.object().shape({
  name: Yup.string().required(),
  description: Yup.string().required(),
  amount: Yup.string().required(),
  date: Yup.mixed<DateValue>().required(),
  category: Yup.string().required(),
});

const addFinance = async (payload: ITransaction) => {
  const { data } = await financeServices.createTransaction(payload);
  return data;
};

const useAddFinanceModal = (type: "income" | "expense") => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ resolver: yupResolver(addFinanceSchema) });

  const {
    mutate: mutateAddTransaction,
    isPending: isPendingAddTransaction,
    isSuccess: isSuccessAddTransaction,
  } = useMutation({
    mutationKey: ["addFinance"],
    mutationFn: addFinance,
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
        description: "Tambah data pendapatan berhasil!",
        color: "success",
        variant: "bordered",
      });
    },
  });

  const handleAddTransaction = (payload: ITransactionForm) => {
    const data: ITransaction = {
      name: payload.name,
      description: payload.description,
      category: payload.category,
      date: toDateStandard(payload.date),
      amount: Number(payload.amount),
      type,
    };

    mutateAddTransaction(data);
  };

  return {
    control,
    errors,
    handleAddTransaction,
    handleSubmit,
    isPendingAddTransaction,
    isSuccessAddTransaction,
  };
};

export default useAddFinanceModal;
