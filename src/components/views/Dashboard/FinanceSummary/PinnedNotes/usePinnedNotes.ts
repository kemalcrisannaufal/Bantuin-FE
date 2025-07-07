import noteServices from "@/services/note.service";
import { INote } from "@/type/Note";
import { useQuery } from "@tanstack/react-query";

const usePinnedNotes = () => {
  const getPinnedNotes = async (): Promise<INote[]> => {
    const { data } = await noteServices.getNotes(`isPinned=true`);
    return data.data;
  };

  const { data: pinnedNotesData, isLoading: isLoadingPinnedNotesData } =
    useQuery({
      queryKey: ["getPinnedNotes"],
      queryFn: getPinnedNotes,
      enabled: true,
    });

  return { isLoadingPinnedNotesData, pinnedNotesData };
};

export default usePinnedNotes;
