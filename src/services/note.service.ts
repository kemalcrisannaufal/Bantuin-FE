import instance from "@/lib/axios/instance";
import endpoint from "./endpoint.constants";
import { INote } from "@/type/Note";

const noteServices = {
  addNote: (payload: INote) => instance.post(`${endpoint.NOTE}`, payload),
  getNotes: (params?: string) => instance.get(`${endpoint.NOTE}?${params}`),
  getNoteById: (id: string) => instance.get(`${endpoint.NOTE}/${id}`),
  updateNotes: (id: string, payload: INote) =>
    instance.put(`${endpoint.NOTE}/${id}`, payload),
  deleteNote: (id: string) => instance.delete(`${endpoint.NOTE}/${id}`),
  updatePinnedStatus: (id: string) =>
    instance.patch(`${endpoint.NOTE}/${id}/pin-status`),
};

export default noteServices;
