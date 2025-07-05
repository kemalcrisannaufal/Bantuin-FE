import { ITodo } from "@/type/Todo";
import { cn } from "@/utils/cn";
import { toDateStandardFromAPI } from "@/utils/date";
import {
  Button,
  Card,
  CardBody,
  Checkbox,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { Dispatch, SetStateAction } from "react";
import { CiEdit, CiMenuKebab, CiTrash } from "react-icons/ci";

interface Proptypes {
  handleUpdateStatus: (id: string) => void;
  isPendingUpdateStatus: boolean;
  onOpenDeleteTodosModal: () => void;
  onOpenUpdateTodosModal: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
  todo: ITodo;
}

const TodoCard = (props: Proptypes) => {
  const {
    handleUpdateStatus,
    isPendingUpdateStatus,
    onOpenDeleteTodosModal,
    onOpenUpdateTodosModal,
    selectedId,
    setSelectedId,
    todo,
  } = props;

  return (
    <>
      <Card shadow="sm">
        <CardBody className="p-4">
          <div className="flex items-start gap-2">
            <div className="px-1 py-2">
              <Checkbox
                key={`checkbox-todo-${todo._id}`}
                className={cn(
                  "block",
                  isPendingUpdateStatus &&
                    selectedId === todo._id &&
                    "opacity-5 cursor-not-allowed"
                )}
                size="lg"
                defaultSelected={todo.status === "completed"}
                disabled={isPendingUpdateStatus}
                onChange={() => {
                  setSelectedId(`${todo._id}`);
                  handleUpdateStatus(`${todo._id}`);
                }}
              />
            </div>

            <div className="w-full">
              <div className="flex justify-between items-center">
                <div className="flex items-start gap-3">
                  <h5 className="font-semibold text-foreground-700 text-lg">
                    {todo.title}
                  </h5>

                  <Chip
                    size="sm"
                    radius="sm"
                    color={todo.status === "completed" ? "success" : "warning"}
                    variant="solid"
                    className="mt-1 text-white capitalize"
                  >
                    {todo.status === "completed" ? "Selesai" : "Belum Selesai"}
                  </Chip>
                </div>

                <Dropdown>
                  <DropdownTrigger>
                    <Button className="bg-transparent" isIconOnly size="sm">
                      <CiMenuKebab />
                    </Button>
                  </DropdownTrigger>

                  <DropdownMenu>
                    <DropdownItem
                      color="primary"
                      key={"edit"}
                      startContent={<CiEdit />}
                      className="text-primary"
                      onPress={() => {
                        setSelectedId(`${todo._id}`);
                        onOpenUpdateTodosModal();
                      }}
                    >
                      Edit
                    </DropdownItem>
                    <DropdownItem
                      color="primary"
                      key={"delete"}
                      startContent={<CiTrash />}
                      className="text-danger"
                      onPress={() => {
                        setSelectedId(`${todo._id}`);
                        onOpenDeleteTodosModal();
                      }}
                    >
                      Delete
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>

              <div className="flex justify-between items-center mt-1">
                <span className="text-foreground-600 text-sm">
                  {toDateStandardFromAPI(todo.dueDate, true)}
                </span>
              </div>
              <p className="mt-2 text-foreground-600 text-sm">
                {todo.description}
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default TodoCard;
