import todoServices from "@/services/todo.service";
import { ITodo, ITodoForm } from "@/type/Todo";
import { toDateStandard } from "@/utils/date";
import { addToast, DateValue } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const todosValidationSchema = Yup.object().shape({
  title: Yup.string().required("Nama tugas wajib diisi!"),
  description: Yup.string(),
  dueDate: Yup.mixed<DateValue>().required(),
});

const useAddTodosModal = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ resolver: yupResolver(todosValidationSchema) });

  const addTodos = async (payload: ITodo) => {
    const { data } = await todoServices.createTodos(payload);
    return data;
  };

  const {
    mutate: mutateAddTodos,
    isPending: isPendingAddTodos,
    isSuccess: isSuccessAddTodos,
  } = useMutation({
    mutationKey: ["addTodos"],
    mutationFn: addTodos,
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
        description: "Berhasil menambahkan tugas!",
        variant: "bordered",
        color: "success",
      });
    },
  });

  const handleAddTodo = (payload: ITodoForm) => {
    const data: ITodo = {
      title: payload.title,
      description: payload.description,
      dueDate: toDateStandard(payload.dueDate),
    };

    mutateAddTodos(data);
  };

  return {
    control,
    errors,
    handleSubmit,
    reset,

    handleAddTodo,
    isPendingAddTodos,
    isSuccessAddTodos,
  };
};

export default useAddTodosModal;
