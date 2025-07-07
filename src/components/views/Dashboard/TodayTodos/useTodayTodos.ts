import todoServices from "@/services/todo.service";
import { ITodo } from "@/type/Todo";
import { useQuery } from "@tanstack/react-query";

const useTodayTodos = () => {
  const getTodayTodos = async (): Promise<ITodo[]> => {
    const { data } = await todoServices.getTodosToday();
    return data.data;
  };

  const { data: todayTodos, isLoading: isLoadingTodayTodos } = useQuery({
    queryKey: ["getTodayTodos"],
    queryFn: getTodayTodos,
    enabled: true,
  });

  return { isLoadingTodayTodos, todayTodos };
};

export default useTodayTodos;
