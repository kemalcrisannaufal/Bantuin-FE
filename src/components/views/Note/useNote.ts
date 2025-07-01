import noteServices from "@/services/note.service";
import { INote } from "@/type/Note";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useNote = () => {
  const [selectedId, setSelectedId] = useState<string>("");

  const getNotes = async (): Promise<INote[]> => {
    const { data } = await noteServices.getNotes();
    return data.data;
  };

  const {
    data: notesData,
    isLoading: isLoadingNotesData,
    refetch: refetchNotesData,
  } = useQuery({
    queryKey: ["getNotes"],
    queryFn: getNotes,
    enabled: true,
  });

  return {
    notesData,
    isLoadingNotesData,
    refetchNotesData,
    selectedId,
    setSelectedId,
  };
};

export default useNote;
