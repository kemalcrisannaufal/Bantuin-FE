import noteServices from "@/services/note.service";
import { INote } from "@/type/Note";
import { useQuery } from "@tanstack/react-query";

const useNote = () => {
  const getNotes = async (): Promise<INote[]> => {
    const { data } = await noteServices.getNotes();
    return data.data;
  };

  const { data: notesData, refetch: refetchNotesData } = useQuery({
    queryKey: ["getNotes"],
    queryFn: getNotes,
    enabled: true,
  });

  return { notesData, refetchNotesData };
};

export default useNote;
