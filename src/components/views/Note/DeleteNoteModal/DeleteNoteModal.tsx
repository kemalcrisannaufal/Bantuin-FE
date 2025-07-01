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
  const { handleDeleteNote, isPendingDeleteNote, isSuccessDeleteNote } =
    useDeleteNoteModal();

  useEffect(() => {
    if (isSuccessDeleteNote) {
      refetchNotes();
      onClose();
    }
  }, [isSuccessDeleteNote, refetchNotes, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={() => {
        setSelectedDeletedId("");
        onClose();
      }}
    >
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
