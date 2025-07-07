import { Card, CardBody, Checkbox, Skeleton } from "@heroui/react";
import useTodayTodos from "./useTodayTodos";
import { toDateStandardFromAPI } from "@/utils/date";
import Image from "next/image";

const TodayTodos = () => {
  const { isLoadingTodayTodos, todayTodos } = useTodayTodos();

  return (
    <div className="w-full xl:w-1/3">
      <Card>
        <CardBody className="p-4">
          <div>
            <h2 className="mb-4 font-bold text-primary text-xl">
              Tugas Hari Ini
            </h2>
          </div>

          {!isLoadingTodayTodos
            ? todayTodos?.map((todo) => (
                <div
                  key={`dashboard-todo-${todo._id}`}
                  className="flex items-center gap-3 shadow-sm mb-1.5 p-3.5 border border-neutral-200 rounded-lg"
                >
                  <Checkbox
                    isDisabled
                    size="lg"
                    radius="full"
                    isSelected={todo.status === "completed"}
                  />
                  <div>
                    <p className="font-medium text-md line-clamp-1">
                      {todo.title}
                    </p>
                    <p className="mb-1 text-foreground-600 text-sm line-clamp-1">
                      {toDateStandardFromAPI(todo.dueDate, true)}
                    </p>
                    <p className="text-sm line-clamp-1">{todo.description}</p>
                  </div>
                </div>
              ))
            : Array.from({ length: 5 }).map((_, index) => (
                <Skeleton
                  key={`todo-dashboard-skeleton-${index}`}
                  className="mb-1.5 rounded-lg h-[85px]"
                />
              ))}

          {!isLoadingTodayTodos && todayTodos?.length === 0 && (
            <div className="flex justify-center items-center gap-1">
              <Image
                src="/images/illustrations/data-not-found.jpg"
                alt="data not found"
                width={150}
                height={150}
              />
              <p className="font-medium text-foreground-600 text-lg">
                Data tidak ditemukan!
              </p>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default TodayTodos;
