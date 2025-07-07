import { INote } from "@/type/Note";
import {
  Button,
  Card,
  CardBody,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Skeleton,
} from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { CiEdit, CiMenuKebab, CiStickyNote, CiTrash } from "react-icons/ci";
import { FaThumbtack } from "react-icons/fa";

interface Proptypes {
  bottomContent?: ReactNode;
  handleUpdatePinnedStatus: (id: string) => void;
  isLoading: boolean;
  notesData: INote[] | undefined;
  onOpenDelete: () => void;
  onOpenUpdate: () => void;
  setSelectedId: Dispatch<SetStateAction<string>>;
  topContent?: ReactNode;
}

const NoteList = (props: Proptypes) => {
  const {
    bottomContent,
    handleUpdatePinnedStatus,
    isLoading,
    notesData,
    onOpenDelete,
    onOpenUpdate,
    setSelectedId,
    topContent,
  } = props;

  const { push } = useRouter();

  return (
    <>
      <div className="my-5">{topContent}</div>
      <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {!isLoading
          ? notesData?.map((note) => (
              <Card key={note._id}>
                <CardBody>
                  <div className="flex justify-between items-center mb-1.5">
                    <h5 className="font-semibold text-lg line-clamp-1">
                      {note.title}
                    </h5>

                    <div className="flex gap-2">
                      <Dropdown>
                        <DropdownTrigger>
                          <Button
                            isIconOnly
                            size="sm"
                            className="bg-transparent"
                          >
                            <CiMenuKebab />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                          <DropdownItem
                            key={"detail"}
                            startContent={<FaThumbtack />}
                            onPress={() =>
                              handleUpdatePinnedStatus(`${note._id}`)
                            }
                            color="primary"
                            className="text-primary"
                          >
                            {note.isPinned ? "Hapus pin" : "Sematkan"}
                          </DropdownItem>
                          <DropdownItem
                            key={"detail"}
                            startContent={<CiStickyNote />}
                            onPress={() => push(`/notes/${note._id}`)}
                            color="primary"
                            className="text-primary"
                          >
                            Detail
                          </DropdownItem>
                          <DropdownItem
                            key={"edit"}
                            startContent={<CiEdit />}
                            onPress={() => {
                              setSelectedId(`${note._id}`);
                              onOpenUpdate();
                            }}
                            color="primary"
                            className="text-primary"
                          >
                            Edit
                          </DropdownItem>
                          <DropdownItem
                            key={"delete"}
                            startContent={<CiTrash />}
                            onPress={() => {
                              setSelectedId(`${note._id}`);
                              onOpenDelete();
                            }}
                            color="primary"
                            className="text-danger"
                          >
                            Hapus
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </div>

                  <div
                    className="text-foreground-600 line-clamp-2 prose ProseMirror"
                    dangerouslySetInnerHTML={{ __html: note.content }}
                  />
                </CardBody>
              </Card>
            ))
          : Array.from({ length: 3 }).map((_, index) => (
              <Skeleton
                key={`skeleton-note-${index}`}
                className="rounded-lg h-28"
              />
            ))}
      </div>
      {!isLoading && notesData?.length === 0 && (
        <div className="flex justify-center items-center bg-white px-5 py-3 border border-neutral-300 rounded-xl w-full text-foreground-600 text-xl">
          <Image
            src="/images/illustrations/data-not-found.jpg"
            alt="data not found"
            width={150}
            height={150}
          />
          <p>Catatan tidak ditemukan!</p>
        </div>
      )}

      {bottomContent}
    </>
  );
};

export default NoteList;
