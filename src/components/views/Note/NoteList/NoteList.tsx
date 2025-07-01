import { INote } from "@/type/Note";
import { Button, Card, CardBody, Skeleton } from "@heroui/react";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { CiEdit, CiTrash } from "react-icons/ci";

interface Proptypes {
  isLoading: boolean;
  notesData: INote[] | undefined;
  onOpenDelete: () => void;
  onOpenUpdate: () => void;
  setSelectedId: Dispatch<SetStateAction<string>>;
  topContent?: ReactNode;
}

const NoteList = (props: Proptypes) => {
  const {
    isLoading,
    notesData,
    onOpenDelete,
    onOpenUpdate,
    setSelectedId,
    topContent,
  } = props;
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
                      <Button
                        isIconOnly
                        size="sm"
                        color="primary"
                        onPress={() => {
                          setSelectedId(`${note._id}`);
                          onOpenUpdate();
                        }}
                      >
                        <CiEdit className="text-xl" />
                      </Button>
                      <Button
                        isIconOnly
                        size="sm"
                        color="danger"
                        onPress={() => {
                          setSelectedId(`${note._id}`);
                          onOpenDelete();
                        }}
                      >
                        <CiTrash className="text-xl" />
                      </Button>
                    </div>
                  </div>

                  <p className="text-foreground-600 line-clamp-2">
                    {note.content}
                  </p>
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
    </>
  );
};

export default NoteList;
