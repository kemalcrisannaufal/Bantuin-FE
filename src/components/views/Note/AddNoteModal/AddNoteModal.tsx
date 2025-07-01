import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
  Spinner,
  Textarea,
} from "@heroui/react";
import useAddNoteModal from "./useAddNoteModal";
import { Controller } from "react-hook-form";
import { useEffect } from "react";

interface Proptypes {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  refetchNotes: () => void;
}

const AddNoteModal = (props: Proptypes) => {
  const { isOpen, onOpenChange, onClose, refetchNotes } = props;
  const {
    control,
    errors,
    handleAddNote,
    handleSubmit,
    isPendingAddNote,
    isSuccessAddNote,
  } = useAddNoteModal();

  useEffect(() => {
    if (isSuccessAddNote) {
      refetchNotes();
      onClose();
    }
  }, [isSuccessAddNote, refetchNotes, onClose]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Tambah Catatan</ModalHeader>
        <ModalBody>
          <form
            onSubmit={handleSubmit(handleAddNote)}
            className="flex flex-col gap-4"
          >
            <Controller
              control={control}
              name="title"
              render={({ field }) => (
                <Input
                  {...field}
                  autoFocus
                  label="Judul"
                  variant="bordered"
                  isInvalid={errors.title !== undefined}
                  errorMessage={errors.title?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="content"
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="Catatan"
                  variant="bordered"
                  isInvalid={errors.content !== undefined}
                  errorMessage={errors.content?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="isPinned"
              render={({ field }) => (
                <Select
                  {...field}
                  label="Sematkan catatan ini?"
                  variant="bordered"
                  isInvalid={errors.isPinned !== undefined}
                  errorMessage={errors.isPinned?.message}
                >
                  <SelectItem key={"false"}>Tidak</SelectItem>
                  <SelectItem key={"true"}>Ya</SelectItem>
                </Select>
              )}
            />

            <Button
              type="submit"
              color="primary"
              disabled={isPendingAddNote}
              className="disabled:opacity-50 disabled:cursor-default"
            >
              {isPendingAddNote ? (
                <Spinner color="white" size="sm" />
              ) : (
                "Simpan Catatan"
              )}
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default AddNoteModal;
