import { Card, CardBody, Skeleton } from "@heroui/react";
import usePinnedNotes from "./usePinnedNotes";
import Link from "next/link";
import { FaThumbtack } from "react-icons/fa";
import Image from "next/image";

const PinnedNotes = () => {
  const { pinnedNotesData, isLoadingPinnedNotesData } = usePinnedNotes();
  return (
    <div>
      <Card>
        <CardBody className="p-4">
          <div>
            <h2 className="font-bold text-primary text-xl">Catatan penting</h2>

            <div className="gap-3 grid grid-cols-1 md:grid-cols-3 pt-3">
              {!isLoadingPinnedNotesData
                ? pinnedNotesData?.map((note) => (
                    <Link
                      className="relative shadow-md p-3 border border-neutral-200 rounded-lg"
                      href={`/notes/${note._id}`}
                      key={`pinned-note-${note._id}`}
                    >
                      <FaThumbtack
                        className="top-1.5 right-1.5 absolute text-primary text-lg rotate-45"
                        aria-label="pinned-icon"
                      />

                      <p className="font-semibold text-foreground-700 text-lg line-clamp-2">
                        {note.title}
                      </p>
                      <div
                        dangerouslySetInnerHTML={{ __html: note.content }}
                        className="mt-1.5 text-foreground-600 text-sm line-clamp-2 ProseMirror"
                      />
                    </Link>
                  ))
                : Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton
                      key={`pinned-notes-skeleton-${index}`}
                      className="rounded-lg h-[120px]"
                    />
                  ))}
            </div>
          </div>

          {!isLoadingPinnedNotesData && pinnedNotesData?.length === 0 && (
            <div className="flex justify-center items-center gap-5">
              <Image
                src="/images/illustrations/data-not-found.jpg"
                alt="data not found"
                width={150}
                height={150}
              />
              <p className="font-medium text-foreground-600 text-lg">
                Data tidak ditemukan!
              </p>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default PinnedNotes;
