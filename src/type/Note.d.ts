interface INote {
  _id?: string;
  title: string;
  content: string;
  isPinned: boolean;
  userId?: string;
}

interface INoteForm extends Omit<INote, "_id" | "isPinned" | "userId"> {
  isPinned: string;
}
export { INote, INoteForm };
