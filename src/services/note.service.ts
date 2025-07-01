import instance from "@/lib/axios/instance";
import endpoint from "./endpoint.constants";
import { INote } from "@/type/Note";

const noteServices = {
  addNote: (payload: INote) => instance.post(`${endpoint.NOTE}`, payload),
  getNotes: () => instance.get(`${endpoint.NOTE}`),
  getNoteById: (id: string) => instance.get(`${endpoint.NOTE}/${id}`),
  updateNotes: (id: string, payload: INote) =>
    instance.put(`${endpoint.NOTE}/${id}`, payload),
  deleteNote: (id: string) => instance.delete(`${endpoint.NOTE}/${id}`),
};

export default noteServices;
