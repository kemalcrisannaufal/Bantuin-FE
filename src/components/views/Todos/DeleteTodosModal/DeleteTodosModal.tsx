import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import useDeleteTodosModal from "./useDeleteTodosModal";
import { Dispatch, SetStateAction, useEffect } from "react";

interface Proptypes {
  deletedId: string;
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  refetchTodos: () => void;
  setDeletedId: Dispatch<SetStateAction<string>>;
}

const DeleteTodosModal = (props: Proptypes) => {
  const {
    deletedId,
    isOpen,
    onOpenChange,
    onClose,
    refetchTodos,
    setDeletedId,
  } = props;

  const {
    handleDeleteTodos,
    isPendingMutateDeleteTodos,
    isSuccessMutateDeleteTodos,
  } = useDeleteTodosModal();

  useEffect(() => {
    if (isSuccessMutateDeleteTodos) {
      refetchTodos();
      setDeletedId("");
      onClose();
    }
  }, [isSuccessMutateDeleteTodos, refetchTodos, setDeletedId, onClose]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Hapus tugas</ModalHeader>
        <ModalBody>
          <p>Apakah kamu yakin ingin menghapus data tugas?</p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            disabled={isPendingMutateDeleteTodos}
            className="disabled:opacity-50 disabled:cursor-default"
            onPress={() => handleDeleteTodos(deletedId)}
          >
            {isPendingMutateDeleteTodos ? (
              <Spinner color="white" size="sm" />
            ) : (
              "Ya, Saya yakin"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteTodosModal;
