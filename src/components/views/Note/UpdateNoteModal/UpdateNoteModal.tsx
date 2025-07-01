import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
  Skeleton,
  Spinner,
  Textarea,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect } from "react";
import useUpdateNoteModal from "./useUpdateNoteModal";

interface Proptypes {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  refetchNotes: () => void;
  setSelectedUpdatedId: Dispatch<SetStateAction<string>>;
  updatedId: string;
}

const UpdateNoteModal = (props: Proptypes) => {
  const {
    isOpen,
    onOpenChange,
    onClose,
    refetchNotes,
    setSelectedUpdatedId,
    updatedId,
  } = props;
  const {
    isLoadingNoteDetailData,
    noteDetailData,

    control,
    errors,
    handleSubmit,
    handleUpdateNote,
    isPendingUpdateNote,
    isSuccessUpdateNote,
    setValue,
  } = useUpdateNoteModal(updatedId);

  useEffect(() => {
    if (isSuccessUpdateNote) {
      setSelectedUpdatedId("");
      refetchNotes();
      onClose();
    }
  }, [isSuccessUpdateNote, refetchNotes, onClose, setSelectedUpdatedId]);

  useEffect(() => {
    if (noteDetailData) {
      setValue("title", noteDetailData.title);
      setValue("content", noteDetailData.content);
      setValue("isPinned", noteDetailData.isPinned ? "true" : "false");
    }
  }, [noteDetailData, setValue]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Tambah Catatan</ModalHeader>
        <ModalBody>
          <form
            onSubmit={handleSubmit(handleUpdateNote)}
            className="flex flex-col gap-4"
          >
            <Controller
              control={control}
              name="title"
              render={({ field }) => (
                <Skeleton
                  isLoaded={!isLoadingNoteDetailData}
                  className="rounded-xl"
                >
                  <Input
                    {...field}
                    autoFocus
                    label="Judul"
                    variant="bordered"
                    isInvalid={errors.title !== undefined}
                    errorMessage={errors.title?.message}
                  />
                </Skeleton>
              )}
            />

            <Controller
              control={control}
              name="content"
              render={({ field }) => (
                <Skeleton
                  isLoaded={!isLoadingNoteDetailData}
                  className="rounded-xl"
                >
                  <Textarea
                    {...field}
                    label="Catatan"
                    variant="bordered"
                    isInvalid={errors.content !== undefined}
                    errorMessage={errors.content?.message}
                  />
                </Skeleton>
              )}
            />

            <Controller
              control={control}
              name="isPinned"
              render={({ field }) => (
                <Skeleton
                  isLoaded={!isLoadingNoteDetailData}
                  className="rounded-xl"
                >
                  <Select
                    {...field}
                    label="Sematkan catatan ini?"
                    variant="bordered"
                    selectedKeys={new Set([field.value])}
                    onSelectionChange={(keys) => {
                      const value = Array.from(keys)[0];
                      field.onChange(value);
                    }}
                    isInvalid={!!errors.isPinned}
                    errorMessage={errors.isPinned?.message}
                  >
                    <SelectItem key="false">Tidak</SelectItem>
                    <SelectItem key="true">Ya</SelectItem>
                  </Select>
                </Skeleton>
              )}
            />

            <Button
              type="submit"
              color="primary"
              disabled={isPendingUpdateNote}
              className="disabled:opacity-50 disabled:cursor-default"
            >
              {isPendingUpdateNote ? (
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
export default UpdateNoteModal;
