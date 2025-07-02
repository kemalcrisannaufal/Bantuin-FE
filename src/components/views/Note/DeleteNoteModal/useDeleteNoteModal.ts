import noteServices from "@/services/note.service";
import { addToast } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";

const useDeleteNoteModal = () => {
  const deleteNote = async (id: string) => {
    const result = await noteServices.deleteNote(id);
    return result;
  };

  const {
    mutate: mutateDeleteNote,
    isPending: isPendingDeleteNote,
    isSuccess: isSuccessDeleteNote,
    reset: resetMutateSuccessDeleteNote,
  } = useMutation({
    mutationKey: ["deleteNote"],
    mutationFn: deleteNote,
    onError: (error: IApiError) => {
      addToast({
        title: "Error",
        description:
          error.response?.data?.meta?.message || "Gagal menghapus note!",
        color: "danger",
        variant: "bordered",
      });
    },
    onSuccess: () => {
      addToast({
        title: "Sukses",
        description: "Note berhasil dihapus!",
        color: "success",
        variant: "bordered",
      });
    },
  });

  const handleDeleteNote = (id: string) => mutateDeleteNote(id);

  return {
    handleDeleteNote,
    isPendingDeleteNote,
    isSuccessDeleteNote,
    resetMutateSuccessDeleteNote,
  };
};

export default useDeleteNoteModal;
