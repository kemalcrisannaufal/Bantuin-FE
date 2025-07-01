import noteServices from "@/services/note.service";
import { INote, INoteForm } from "@/type/Note";
import { addToast } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const noteValidationSchema = Yup.object().shape({
  title: Yup.string().required(),
  content: Yup.string().required(),
  isPinned: Yup.string().required(),
});

const useAddNoteModal = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ resolver: yupResolver(noteValidationSchema) });

  const addNote = async (payload: INote) => {
    const result = await noteServices.addNote(payload);
    return result;
  };

  const {
    mutate: mutateAddNote,
    isPending: isPendingAddNote,
    isSuccess: isSuccessAddNote,
  } = useMutation({
    mutationKey: ["addNote"],
    mutationFn: addNote,
    onError: (error: IApiError) => {
      addToast({
        title: "Error",
        description: error.response?.data?.meta?.message,
        color: "danger",
        variant: "bordered",
      });
    },
    onSuccess: () => {
      reset();
      addToast({
        title: "Error",
        description: "Tambah note sukses!",
        color: "success",
        variant: "bordered",
      });
    },
  });

  const handleAddNote = (payload: INoteForm) => {
    const data: INote = {
      title: payload.title,
      content: payload.content,
      isPinned: payload.isPinned === "true" ? true : false,
    };

    mutateAddNote(data);
  };

  return {
    control,
    errors,
    handleAddNote,
    handleSubmit,
    isPendingAddNote,
    isSuccessAddNote,
  };
};

export default useAddNoteModal;
