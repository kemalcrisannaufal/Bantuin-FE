import todoServices from "@/services/todo.service";
import { addToast } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";

const useDeleteTodosModal = () => {
  const deleteTodos = async (id: string) => {
    const { data } = await todoServices.deleteTodosById(id);
    return data;
  };

  const {
    mutate: mutateDeleteTodos,
    isPending: isPendingMutateDeleteTodos,
    isSuccess: isSuccessMutateDeleteTodos,
  } = useMutation({
    mutationKey: ["deleteTodos"],
    mutationFn: deleteTodos,
    onError: (error: IApiError) => {
      addToast({
        title: "Error",
        description: error.response?.data?.meta?.message,
        variant: "bordered",
        color: "danger",
      });
    },

    onSuccess: () => {
      addToast({
        title: "Sukses",
        description: "Berhasil menghapus tugas!",
        variant: "bordered",
        color: "success",
      });
    },
  });

  const handleDeleteTodos = (id: string) => mutateDeleteTodos(id);

  return {
    handleDeleteTodos,
    isPendingMutateDeleteTodos,
    isSuccessMutateDeleteTodos,
  };
};

export default useDeleteTodosModal;
