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
} from "@heroui/react";
import useAddNoteModal from "./useAddNoteModal";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import TextEditor from "@/components/ui/TextEditor/TextEditor";
import { cn } from "@/utils/cn";

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

    reset,
    resetAddNoteMutation,
  } = useAddNoteModal();

  useEffect(() => {
    if (isSuccessAddNote) {
      refetchNotes();
      resetAddNoteMutation();
      onClose();
    }
  }, [isSuccessAddNote, refetchNotes, onClose, resetAddNoteMutation]);

  const handleModalOnClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={handleModalOnClose}
    >
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
                <div className="relative">
                  <div
                    className={cn(
                      errors.content && "border-2 border-danger rounded-lg mb-4"
                    )}
                  >
                    <TextEditor value={field.value} onChange={field.onChange} />
                  </div>
                  {errors.content && (
                    <p className="-bottom-1 left-0 absolute text-danger text-xs">
                      {errors.content.message}
                    </p>
                  )}
                </div>
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
