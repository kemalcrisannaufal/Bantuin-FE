import todoServices from "@/services/todo.service";
import { ITodo, ITodoForm } from "@/type/Todo";
import { toDateStandard } from "@/utils/date";
import { addToast, DateValue } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const todosValidationSchema = Yup.object().shape({
  title: Yup.string().required("Nama tugas wajib diisi!"),
  description: Yup.string(),
  dueDate: Yup.mixed<DateValue>().required(),
});

const useUpdateTodosModal = (id: string) => {
  const getTodosById = async (): Promise<ITodo> => {
    const { data } = await todoServices.getTodoById(id);
    return data.data;
  };

  const { data: todoData, isLoading: isLoadingTodoData } = useQuery({
    queryKey: ["getTodosById", id],
    queryFn: getTodosById,
    enabled: !!id,
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm({ resolver: yupResolver(todosValidationSchema) });

  const updateTodos = async (payload: ITodo) => {
    const { data } = await todoServices.updateTodos(id, payload);
    return data;
  };

  const {
    mutate: mutateUpdateTodos,
    isPending: isPendingUpdateTodos,
    isSuccess: isSuccessUpdateTodos,
  } = useMutation({
    mutationKey: ["updateTodos"],
    mutationFn: updateTodos,
    onError: (error: IApiError) => {
      addToast({
        title: "Error",
        description: error.response?.data?.meta?.message,
        variant: "bordered",
        color: "danger",
      });
    },

    onSuccess: () => {
      reset();
      addToast({
        title: "Sukses",
        description: "Berhasil memperbarui tugas!",
        variant: "bordered",
        color: "success",
      });
    },
  });

  const handleUpdateTodo = (payload: ITodoForm) => {
    const data: ITodo = {
      title: payload.title,
      description: payload.description,
      dueDate: toDateStandard(payload.dueDate),
    };

    mutateUpdateTodos(data);
  };

  return {
    isLoadingTodoData,
    todoData,

    control,
    errors,
    handleSubmit,
    reset,
    setValue,

    handleUpdateTodo,
    isPendingUpdateTodos,
    isSuccessUpdateTodos,
  };
};

export default useUpdateTodosModal;
