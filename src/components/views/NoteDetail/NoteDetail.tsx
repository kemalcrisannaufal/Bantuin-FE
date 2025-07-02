import { Card, CardBody, Skeleton } from "@heroui/react";
import useNoteDetail from "./useNoteDetail";
import { toLocaleDateTime } from "@/utils/date";

const NoteDetail = () => {
  const { noteData, isLoadingNoteData } = useNoteDetail();
  return (
    <div className="w-full xl:w-2/3">
      <div>
        <Skeleton isLoaded={!isLoadingNoteData} className="rounded-xl h-8">
          <h2 className="font-bold text-primary text-2xl">{noteData?.title}</h2>
        </Skeleton>

        <Skeleton isLoaded={!isLoadingNoteData} className="mt-2 rounded-xl h-6">
          <h5 className="font-medium text-foreground-600 text-sm">
            Terakhir diedit: {toLocaleDateTime(`${noteData?.lastEdited}`)}{" "}
          </h5>
        </Skeleton>
      </div>

      <div className="mt-5 md:mt-8">
        <Skeleton
          isLoaded={!isLoadingNoteData}
          className="mb-5 rounded-xl h-[150px]"
        >
          <Card>
            <CardBody className="p-5">
              <div
                dangerouslySetInnerHTML={{ __html: `${noteData?.content}` }}
                className="list-disc prose ProseMirror"
              />
            </CardBody>
          </Card>
        </Skeleton>
      </div>

      {isLoadingNoteData && (
        <>
          <Skeleton className="mb-5 rounded-xl h-[150px]" />
          <Skeleton className="mb-5 rounded-xl h-[150px]" />
          <Skeleton className="mb-5 rounded-xl h-[150px]" />
        </>
      )}
    </div>
  );
};

export default NoteDetail;
