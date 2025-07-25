import TodoCard from "@/components/ui/TodoCard";
import { ITodo } from "@/type/Todo";
import { Skeleton } from "@heroui/react";
import Image from "next/image";
import { Dispatch, ReactNode, SetStateAction } from "react";

interface Proptypes {
  bottomContent?: ReactNode;
  handleUpdateStatus: (id: string) => void;
  isLoading: boolean;
  isPendingUpdateStatus: boolean;
  onOpenDeleteTodosModal: () => void;
  onOpenUpdateTodosModal: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
  todos: ITodo[] | undefined;
  topContent?: ReactNode;
}

const TodosList = (props: Proptypes) => {
  const {
    bottomContent,
    todos,
    handleUpdateStatus,
    isLoading,
    isPendingUpdateStatus,
    onOpenDeleteTodosModal,
    onOpenUpdateTodosModal,
    selectedId,
    setSelectedId,
    topContent,
  } = props;

  const isEmpty = !isLoading && todos && todos?.length === 0;

  return (
    <div className="flex flex-col gap-4">
      {topContent}

      {!isLoading
        ? todos?.map((todo) => (
            <TodoCard
              key={`todo-${todo._id}`}
              handleUpdateStatus={handleUpdateStatus}
              isPendingUpdateStatus={isPendingUpdateStatus}
              onOpenDeleteTodosModal={onOpenDeleteTodosModal}
              onOpenUpdateTodosModal={onOpenUpdateTodosModal}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              todo={todo}
            />
          ))
        : Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              key={`skeleton-todo-card-${index}`}
              className="rounded-xl w-full h-28"
            />
          ))}

      {isEmpty && (
        <div className="flex justify-center items-center bg-white px-5 py-3 border border-neutral-300 rounded-xl w-full text-foreground-600 text-xl">
          <Image
            src="/images/illustrations/data-not-found.jpg"
            alt="data not found"
            width={150}
            height={150}
          />
          Tugas tidak ditemukan!
        </div>
      )}

      {bottomContent}
    </div>
  );
};

export default TodosList;
