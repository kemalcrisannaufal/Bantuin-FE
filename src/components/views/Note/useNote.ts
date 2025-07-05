import useUrl from "@/hooks/useUrl";
import noteServices from "@/services/note.service";
import { INote } from "@/type/Note";
import { addToast } from "@heroui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useNote = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const { currentLimit, currentPage, currentSearch } = useUrl();

  const getPinnedNotes = async (): Promise<INote[]> => {
    const { data } = await noteServices.getNotes(`isPinned=true`);
    return data.data;
  };

  const {
    data: pinnedNotesData,
    isLoading: isLoadingPinnedNotesData,
    refetch: refetchPinnedNotesData,
    isRefetching: isRefetchingPinnedNotesData,
  } = useQuery({
    queryKey: ["getPinnedNotes"],
    queryFn: getPinnedNotes,
    enabled: true,
  });

  const getNotes = async (): Promise<{
    meta: { status: number; message: string };
    data: INote[];
    pagination: { current: number; totalPage: number; total: number };
  }> => {
    let params = `limit=${currentLimit}&page=${currentPage}&search=${currentSearch}`;

    if (currentSearch === "") {
      params += `&isPinned=false`;
    }
    const { data } = await noteServices.getNotes(params);
    return data;
  };

  const {
    data: unpinnedNotesData,
    isLoading: isLoadingUnpinnedNotesData,
    refetch: refetchUnpinnedNotesData,
    isRefetching: isRefetchingUnpinnedNotesData,
  } = useQuery({
    queryKey: ["getNotes", currentLimit, currentPage, currentSearch],
    queryFn: getNotes,
    enabled: true,
  });

  const refetchNotes = () => {
    refetchPinnedNotesData();
    refetchUnpinnedNotesData();
  };

  const isRefetching =
    isRefetchingPinnedNotesData || isRefetchingUnpinnedNotesData;

  const updateNotePinnedStatus = async (id: string) => {
    const { data } = await noteServices.updatePinnedStatus(id);
    return data;
  };

  const {
    mutate: mutateUpdateNotePinnedStatus,
    isSuccess: isSuccessUpdateNotePinnedStatus,
  } = useMutation({
    mutationKey: ["updateNotePinnedStatus"],
    mutationFn: updateNotePinnedStatus,
    onError: (error: IApiError) => {
      addToast({
        title: "Error",
        description:
          error.response?.data?.meta?.message || "Gagal menyematkan catatan!",
        variant: "bordered",
        color: "danger",
      });
    },
    onSuccess: (result) => {
      addToast({
        title: "Sukses",
        description: `Sukses ${
          result.data?.isPinned ? "menyematkan " : "menghapus pin "
        } catatan!`,
        variant: "bordered",
        color: "success",
      });
    },
  });

  const handleUpdateNotePinnedStatus = (id: string) =>
    mutateUpdateNotePinnedStatus(id);

  return {
    selectedId,
    setSelectedId,

    isLoadingUnpinnedNotesData,
    isRefetchingUnpinnedNotesData,
    refetchUnpinnedNotesData,
    unpinnedNotesData,

    isLoadingPinnedNotesData,
    isRefetchingPinnedNotesData,
    pinnedNotesData,
    refetchPinnedNotesData,

    refetchNotes,
    isRefetching,

    handleUpdateNotePinnedStatus,
    isSuccessUpdateNotePinnedStatus,
  };
};

export default useNote;
