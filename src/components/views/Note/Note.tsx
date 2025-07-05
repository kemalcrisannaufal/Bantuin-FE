/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Pagination, useDisclosure } from "@heroui/react";
import useNote from "./useNote";
import { FaPlus, FaThumbtack } from "react-icons/fa";
import AddNoteModal from "./AddNoteModal";
import NoteList from "./NoteList";
import UpdateNoteModal from "./UpdateNoteModal/UpdateNoteModal";
import DeleteNoteModal from "./DeleteNoteModal";
import { CiMemoPad } from "react-icons/ci";
import { useEffect } from "react";
import SearchInput from "@/components/ui/SearchInput";
import useUrl from "@/hooks/useUrl";

const Note = () => {
  const {
    selectedId,
    setSelectedId,

    isLoadingUnpinnedNotesData,
    unpinnedNotesData,

    isLoadingPinnedNotesData,
    pinnedNotesData,

    isRefetching,
    refetchNotes,

    handleUpdateNotePinnedStatus,
    isSuccessUpdateNotePinnedStatus,
  } = useNote();

  const {
    currentPage,
    currentSearch,
    handleChangePage,
    handleChangeSearch,

    setUrl,
  } = useUrl();

  const addNoteModal = useDisclosure();
  const updateNoteModal = useDisclosure();
  const deleteNoteModal = useDisclosure();

  useEffect(() => {
    setUrl();
  }, []);

  useEffect(() => {
    if (isSuccessUpdateNotePinnedStatus) {
      refetchNotes();
    }
  }, [isSuccessUpdateNotePinnedStatus]);

  const topContentPinnedNoteList = (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <FaThumbtack className="text-primary text-xl" />
        <h2 className="font-semibold text-primary text-xl">Disematkan</h2>
      </div>
    </div>
  );

  const topContentUnpinnedNoteList = (
    <div className="flex items-center gap-2">
      <CiMemoPad className="text-primary text-xl" />
      <h2 className="font-semibold text-primary text-xl">Semua Catatan</h2>
    </div>
  );

  const bottomContentUnpinnedNoteList = (
    <>
      {Number(unpinnedNotesData?.pagination.totalPage) > 1 && (
        <div className="flex justify-center items-center mt-5">
          <Pagination
            initialPage={Number(currentPage)}
            total={Number(unpinnedNotesData?.pagination.totalPage)}
            onChange={(page) => handleChangePage(page)}
            className="cursor-pointer"
            isCompact
          />
        </div>
      )}
    </>
  );

  return (
    <>
      <div className="flex items-center gap-5">
        <SearchInput
          placeholder="Cari catatan..."
          onChange={handleChangeSearch}
        />

        <Button
          color="primary"
          startContent={<FaPlus />}
          onPress={addNoteModal.onOpen}
          className="min-w-max"
        >
          <span className="hidden md:block">Tambah</span>
          Catatan
        </Button>
      </div>

      {currentSearch === "" &&
        pinnedNotesData &&
        pinnedNotesData.length > 0 && (
          <NoteList
            handleUpdatePinnedStatus={handleUpdateNotePinnedStatus}
            isLoading={isLoadingPinnedNotesData || isRefetching}
            notesData={pinnedNotesData}
            topContent={topContentPinnedNoteList}
            setSelectedId={setSelectedId}
            onOpenUpdate={updateNoteModal.onOpen}
            onOpenDelete={deleteNoteModal.onOpen}
          />
        )}

      <NoteList
        bottomContent={bottomContentUnpinnedNoteList}
        handleUpdatePinnedStatus={handleUpdateNotePinnedStatus}
        isLoading={isLoadingUnpinnedNotesData || isRefetching}
        notesData={unpinnedNotesData?.data}
        topContent={topContentUnpinnedNoteList}
        setSelectedId={setSelectedId}
        onOpenUpdate={updateNoteModal.onOpen}
        onOpenDelete={deleteNoteModal.onOpen}
      />

      <AddNoteModal {...addNoteModal} refetchNotes={refetchNotes} />

      <UpdateNoteModal
        {...updateNoteModal}
        refetchNotes={refetchNotes}
        setSelectedUpdatedId={setSelectedId}
        updatedId={selectedId}
      />

      <DeleteNoteModal
        {...deleteNoteModal}
        refetchNotes={refetchNotes}
        deletedId={selectedId}
        setSelectedDeletedId={setSelectedId}
      />
    </>
  );
};

export default Note;
