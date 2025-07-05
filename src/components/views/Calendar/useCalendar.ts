import todoServices from "@/services/todo.service";
import { ITodo } from "@/type/Todo";
import { useQuery } from "@tanstack/react-query";

const useCalendar = () => {
  const getAllTodos = async (): Promise<ITodo[]> => {
    const { data } = await todoServices.getTodos(`limit=1000`);
    return data.data;
  };

  const { data: todosData, isLoading: isLoadingTodosData } = useQuery({
    queryKey: ["getAllTodos"],
    queryFn: getAllTodos,
    enabled: true,
  });

  const events = todosData?.map((todo) => {
    return {
      title: todo.title,
      date: todo.dueDate.split("T")[0],
      status: todo.status,
      classNames: [`event-${todo.status}`],
    };
  });

  return { todosData, isLoadingTodosData, events };
};

export default useCalendar;
