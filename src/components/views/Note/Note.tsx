import { Button, useDisclosure } from "@heroui/react";
import useNote from "./useNote";
import { FaPlus } from "react-icons/fa";
import AddNoteModal from "./AddNoteModal";
import NoteList from "./NoteList";
import UpdateNoteModal from "./UpdateNoteModal/UpdateNoteModal";
import DeleteNoteModal from "./DeleteNoteModal";

const Note = () => {
  const {
    isLoadingNotesData,
    notesData,
    refetchNotesData,
    selectedId,
    setSelectedId,
  } = useNote();

  console.log(notesData);

  const addNoteModal = useDisclosure();
  const updateNoteModal = useDisclosure();
  const deleteNoteModal = useDisclosure();

  const topContentPinnedNoteList = (
    <div className="flex justify-between items-center">
      <h2 className="font-semibold text-primary text-xl">Disematkan</h2>

      <Button
        color="primary"
        startContent={<FaPlus />}
        onPress={addNoteModal.onOpen}
      >
        Tambah Catatan
      </Button>
    </div>
  );

  return (
    <div>
      <NoteList
        isLoading={isLoadingNotesData}
        notesData={notesData}
        topContent={topContentPinnedNoteList}
        setSelectedId={setSelectedId}
        onOpenUpdate={updateNoteModal.onOpen}
        onOpenDelete={deleteNoteModal.onOpen}
      />

      <AddNoteModal {...addNoteModal} refetchNotes={refetchNotesData} />
      <UpdateNoteModal
        {...updateNoteModal}
        refetchNotes={refetchNotesData}
        setSelectedUpdatedId={setSelectedId}
        updatedId={selectedId}
      />
      <DeleteNoteModal
        {...deleteNoteModal}
        refetchNotes={refetchNotesData}
        deletedId={selectedId}
        setSelectedDeletedId={setSelectedId}
      />
    </div>
  );
};

export default Note;
