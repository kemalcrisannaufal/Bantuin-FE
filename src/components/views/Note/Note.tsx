import { Button, Card, CardBody, useDisclosure } from "@heroui/react";
import useNote from "./useNote";
import { CiEdit, CiTrash } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import AddNoteModal from "./AddNoteModal";

const Note = () => {
  const { notesData, refetchNotesData } = useNote();

  const addNoteModal = useDisclosure();
  return (
    <div>
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

      <AddNoteModal {...addNoteModal} refetchNotes={refetchNotesData} />
      {/* <TextEditor /> */}

      <div className="gap-5 grid grid-cols-2 lg:grid-cols-3">
        {notesData?.map((note) => (
          <Card key={note._id} className="">
            <CardBody>
              <div className="flex justify-between">
                <h5 className="font-semibold text-lg">{note.title}</h5>

                <div className="flex gap-2">
                  <Button isIconOnly size="sm" color="primary">
                    <CiEdit className="text-xl" />
                  </Button>
                  <Button isIconOnly size="sm" color="danger">
                    <CiTrash className="text-xl" />
                  </Button>
                </div>
              </div>

              <p className="text-foreground-600 line-clamp-2">{note.content}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Note;
