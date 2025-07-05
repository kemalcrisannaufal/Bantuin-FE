import {
  Button,
  DatePicker,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spinner,
  Textarea,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import useAddTodosModal from "./useAddTodosModal";
import { getLocalTimeZone, now } from "@internationalized/date";
import { useEffect } from "react";

interface Proptypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchTodos: () => void;
}

const AddTodosModal = (props: Proptypes) => {
  const { isOpen, onClose, onOpenChange, refetchTodos } = props;

  const {
    control,
    errors,
    handleSubmit,
    reset,

    handleAddTodo,
    isPendingAddTodos,
    isSuccessAddTodos,
  } = useAddTodosModal();

  useEffect(() => {
    if (isSuccessAddTodos) {
      onClose();
      refetchTodos();
    }
  }, [isSuccessAddTodos, onClose, refetchTodos]);

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
        <ModalHeader>Tambah Tugas</ModalHeader>
        <ModalBody>
          <form
            onSubmit={handleSubmit(handleAddTodo)}
            className="flex flex-col gap-4"
          >
            <Controller
              control={control}
              name="title"
              render={({ field }) => (
                <Input
                  {...field}
                  label="Nama Tugas"
                  variant="bordered"
                  autoFocus
                  isInvalid={errors.title !== undefined}
                  errorMessage={errors.title?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="Deskripsi Tugas"
                  variant="bordered"
                  isInvalid={errors.description !== undefined}
                  errorMessage={errors.description?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="dueDate"
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="Tenggat waktu"
                  variant="bordered"
                  showMonthAndYearPickers
                  hideTimeZone
                  defaultValue={now(getLocalTimeZone())}
                />
              )}
            />

            <Button
              type="submit"
              color="primary"
              disabled={isPendingAddTodos}
              className="disabled:opacity-50 disabled:cursor-default"
            >
              {isPendingAddTodos ? (
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

export default AddTodosModal;
