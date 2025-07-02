interface INote {
  _id?: string;
  title: string;
  content: string;
  isPinned: boolean;
  userId?: string;
  lastEdited?: string;
}

interface INoteForm
  extends Omit<INote, "_id" | "isPinned" | "userId" | "lastEdited"> {
  isPinned?: string;
}
export { INote, INoteForm };
