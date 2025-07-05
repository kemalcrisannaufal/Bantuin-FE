import useUrl from "@/hooks/useUrl";
import todoServices from "@/services/todo.service";
import { ITodo } from "@/type/Todo";
import { addToast } from "@heroui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useTodos = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const {
    currentLimit,
    currentPage,
    currentSearch,

    currentTodosRange,
    currentTodosStatus,
    currentTodosUpcoming,
  } = useUrl();

  const getTodos = async (): Promise<{
    meta: { status: number; message: string };
    data: ITodo[];
    pagination: { current: number; totalPage: number; total: number };
  }> => {
    let params = `limit=${currentLimit}&page=${currentPage}`;

    if (currentSearch) {
      params += `&search=${currentSearch}`;
    } else {
      params += `&status=${currentTodosStatus}&range=${currentTodosRange}&upcoming=${currentTodosUpcoming}&order=${
        currentTodosRange === "overdue" || currentTodosRange === ""
          ? "desc"
          : "asc"
      }`;
    }

    const { data } = await todoServices.getTodos(params);
    return data;
  };

  const {
    data: todosData,
    isLoading: isLoadingTodosData,
    refetch: refetchTodosData,
  } = useQuery({
    queryKey: [
      "getTodos",
      currentLimit,
      currentPage,
      currentSearch,

      currentTodosStatus,
      currentTodosRange,
      currentTodosUpcoming,
    ],
    queryFn: getTodos,
    enabled: true,
  });

  const updateTodosStatus = async (id: string) => {
    const { data } = await todoServices.updateStatus(id);
    return data;
  };

  const {
    mutate: mutateUpdateStatus,
    isPending: isPendingUpdateStatus,
    isSuccess: isSuccessUpdateStatus,
  } = useMutation({
    mutationKey: ["updateTodoStatus"],
    mutationFn: updateTodosStatus,
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
        description: "Berhasil memperbarui tugas!",
        variant: "bordered",
        color: "success",
      });
    },
  });

  const handleUpdateStatus = (id: string) => mutateUpdateStatus(id);

  return {
    selectedId,
    setSelectedId,

    isLoadingTodosData,
    refetchTodosData,
    todosData,

    handleUpdateStatus,
    isPendingUpdateStatus,
    isSuccessUpdateStatus,
  };
};

export default useTodos;
