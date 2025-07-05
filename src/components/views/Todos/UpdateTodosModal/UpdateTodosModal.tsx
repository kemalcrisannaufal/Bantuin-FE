import {
  Button,
  DatePicker,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Skeleton,
  Spinner,
  Textarea,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect } from "react";
import useUpdateTodosModal from "./useUpdateTodosModal";
import { toInputDateTime } from "@/utils/date";

interface Proptypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchTodos: () => void;
  setUpdatedId: Dispatch<SetStateAction<string>>;
  updatedId: string;
}

const UpdateTodosModal = (props: Proptypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    refetchTodos,
    setUpdatedId,
    updatedId,
  } = props;

  const {
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
  } = useUpdateTodosModal(updatedId);

  useEffect(() => {
    if (isSuccessUpdateTodos) {
      refetchTodos();
      setUpdatedId("");
      onClose();
    }
  }, [isSuccessUpdateTodos, onClose, refetchTodos, setUpdatedId]);

  useEffect(() => {
    if (todoData) {
      setValue("title", todoData?.title);
      setValue("description", todoData?.description);
      setValue("dueDate", toInputDateTime(`${todoData.dueDate}`));
    }
  }, [todoData, setValue]);

  const handleCloseModal = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={handleCloseModal}
    >
      <ModalContent>
        <ModalHeader>Perbarui Tugas</ModalHeader>
        <ModalBody>
          <form
            onSubmit={handleSubmit(handleUpdateTodo)}
            className="flex flex-col gap-4"
          >
            <Controller
              control={control}
              name="title"
              render={({ field }) => (
                <Skeleton isLoaded={!isLoadingTodoData} className="rounded-xl">
                  <Input
                    {...field}
                    label="Nama Tugas"
                    variant="bordered"
                    autoFocus
                    isInvalid={errors.title !== undefined}
                    errorMessage={errors.title?.message}
                  />
                </Skeleton>
              )}
            />

            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <Skeleton isLoaded={!isLoadingTodoData} className="rounded-xl">
                  <Textarea
                    {...field}
                    label="Deskripsi Tugas"
                    variant="bordered"
                    isInvalid={errors.description !== undefined}
                    errorMessage={errors.description?.message}
                  />
                </Skeleton>
              )}
            />

            <Controller
              control={control}
              name="dueDate"
              render={({ field }) => (
                <Skeleton isLoaded={!isLoadingTodoData} className="rounded-xl">
                  <DatePicker
                    {...field}
                    label="Tenggat waktu"
                    variant="bordered"
                    showMonthAndYearPickers
                    hideTimeZone
                    defaultValue={
                      todoData && toInputDateTime(`${todoData?.dueDate}`)
                    }
                  />
                </Skeleton>
              )}
            />

            <Button
              type="submit"
              color="primary"
              disabled={isPendingUpdateTodos}
              className="disabled:opacity-50 disabled:cursor-default"
            >
              {isPendingUpdateTodos ? (
                <Spinner color="white" size="sm" />
              ) : (
                "Simpan Tugas"
              )}
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UpdateTodosModal;
