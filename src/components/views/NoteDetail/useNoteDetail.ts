import noteServices from "@/services/note.service";
import { INote } from "@/type/Note";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useNoteDetail = () => {
  const router = useRouter();

  const getNoteById = async (): Promise<INote> => {
    const { data } = await noteServices.getNoteById(`${router.query.id}`);
    return data.data;
  };

  const { data: noteData, isLoading: isLoadingNoteData } = useQuery({
    queryKey: ["getNoteById"],
    queryFn: getNoteById,
    enabled: router.isReady && !!router.query.id,
  });

  return { isLoadingNoteData, noteData };
};

export default useNoteDetail;
