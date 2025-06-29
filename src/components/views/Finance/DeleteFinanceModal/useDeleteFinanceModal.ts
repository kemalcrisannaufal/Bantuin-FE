import financeServices from "@/services/finance.service";
import { addToast } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";

const useDeleteFinanceModal = () => {
  const deleteTransaction = async (id: string) => {
    const { data } = await financeServices.deleteTransaction(id);
    return data;
  };

  const {
    mutate: mutateDeleteTransaction,
    isPending: isPendingDelete,
    isSuccess: isSuccessDelete,
  } = useMutation({
    mutationKey: ["deleteTransaction"],
    mutationFn: deleteTransaction,
    onError: (error: IApiError) => {
      addToast({
        title: "Error",
        description: error.response?.data?.meta?.message,
        color: "danger",
        variant: "bordered",
      });
    },
    onSuccess: () => {
      addToast({
        title: "Sukses",
        description: "Data transaksi berhasil dihapus!",
        color: "success",
        variant: "bordered",
      });
    },
  });

  const handleDeleteTransaction = (id: string) => mutateDeleteTransaction(id);

  return { handleDeleteTransaction, isPendingDelete, isSuccessDelete };
};

export default useDeleteFinanceModal;
