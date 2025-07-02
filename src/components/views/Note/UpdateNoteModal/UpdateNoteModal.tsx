import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Skeleton,
  Spinner,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect } from "react";
import useUpdateNoteModal from "./useUpdateNoteModal";
import TextEditor from "@/components/ui/TextEditor/TextEditor";
import { cn } from "@/utils/cn";

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
    reset,
    resetMutateUpdateNote,
    setValue,
  } = useUpdateNoteModal(updatedId);

  useEffect(() => {
    if (isSuccessUpdateNote) {
      refetchNotes();
      setSelectedUpdatedId("");
      onClose();
      resetMutateUpdateNote();
    }
  }, [
    isSuccessUpdateNote,
    onClose,
    refetchNotes,
    resetMutateUpdateNote,
    setSelectedUpdatedId,
  ]);

  useEffect(() => {
    if (noteDetailData) {
      setValue("title", noteDetailData.title);
      setValue("content", noteDetailData.content);
    }
  }, [noteDetailData, setValue]);

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
              render={({ field: { onChange, value } }) => (
                <Skeleton
                  isLoaded={!isLoadingNoteDetailData}
                  className="rounded-xl"
                >
                  <div className="relative">
                    <div
                      className={cn(
                        errors.content && "border border-danger rounded-lg"
                      )}
                    >
                      <TextEditor
                        key={`editor-${updatedId}`}
                        value={value || noteDetailData?.content || ""}
                        onChange={(value) => onChange(value)}
                      />
                    </div>
                    {errors.content && (
                      <p className="-bottom-1 left-0 absolute text-danger text-xs">
                        {errors.content.message}
                      </p>
                    )}
                  </div>
                </Skeleton>
              )}
            />

            <Button
              type="submit"
              color="primary"
              disabled={isPendingUpdateNote || isLoadingNoteDetailData}
              className="disabled:opacity-50 disabled:cursor-default"
            >
              {isPendingUpdateNote || isLoadingNoteDetailData ? (
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
