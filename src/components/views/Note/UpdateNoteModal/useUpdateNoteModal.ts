import noteServices from "@/services/note.service";
import { INote, INoteForm } from "@/type/Note";
import { addToast } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const noteValidationSchema = Yup.object().shape({
  title: Yup.string().required("Judul wajib diisi!"),
  content: Yup.string().required("Catatan wajib diisi!"),
});

const useUpdateNoteModal = (id: string) => {
  const getNoteById = async (): Promise<INote> => {
    const { data } = await noteServices.getNoteById(id);
    return data.data;
  };

  const { data: noteDetailData, isLoading: isLoadingNoteDetailData } = useQuery(
    {
      queryKey: ["getNoteById", id],
      queryFn: getNoteById,
      enabled: !!id,
    }
  );

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(noteValidationSchema),
  });

  const updateNote = async (payload: INote) => {
    const result = await noteServices.updateNotes(id, payload);
    return result;
  };

  const {
    mutate: mutateUpdateNote,
    isPending: isPendingUpdateNote,
    isSuccess: isSuccessUpdateNote,
    reset: resetMutateUpdateNote,
  } = useMutation({
    mutationKey: ["updateNote"],
    mutationFn: updateNote,
    onError: (error: IApiError) => {
      addToast({
        title: "Error",
        description:
          error.response?.data?.meta?.message || "Gagal memperbarui note!",
        color: "danger",
        variant: "bordered",
      });
    },
    onSuccess: () => {
      reset();
      addToast({
        title: "Sukses",
        description: "Update note sukses!",
        color: "success",
        variant: "bordered",
      });
    },
  });

  const handleUpdateNote = (payload: INoteForm) => {
    const data: INote = {
      title: payload.title,
      content: payload.content,
      isPinned: payload.isPinned === "true" ? true : false,
    };

    mutateUpdateNote(data);
  };

  return {
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
  };
};

export default useUpdateNoteModal;
