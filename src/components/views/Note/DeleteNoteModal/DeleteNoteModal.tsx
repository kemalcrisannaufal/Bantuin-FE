import { Dispatch, SetStateAction, useEffect } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import useDeleteNoteModal from "./useDeleteNoteModal";

interface Proptypes {
  deletedId: string;
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchNotes: () => void;
  setSelectedDeletedId: Dispatch<SetStateAction<string>>;
}

const DeleteNoteModal = (props: Proptypes) => {
  const {
    deletedId,
    isOpen,
    onClose,
    onOpenChange,
    refetchNotes,
    setSelectedDeletedId,
  } = props;
  const {
    handleDeleteNote,
    isPendingDeleteNote,
    isSuccessDeleteNote,
    resetMutateSuccessDeleteNote,
  } = useDeleteNoteModal();

  useEffect(() => {
    if (isSuccessDeleteNote) {
      refetchNotes();
      setSelectedDeletedId("");
      onClose();
      resetMutateSuccessDeleteNote();
    }
  }, [
    isSuccessDeleteNote,
    refetchNotes,
    setSelectedDeletedId,
    onClose,
    resetMutateSuccessDeleteNote,
  ]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Hapus Note</ModalHeader>
        <ModalBody>
          <p>Apakah kamu yakin ingin menghapus note?</p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            variant="solid"
            onPress={() => handleDeleteNote(deletedId)}
            className="disabled:opacity-50 disabled:cursor-default"
            disabled={isPendingDeleteNote}
          >
            {isPendingDeleteNote ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Ya, saya yakin"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteNoteModal;
