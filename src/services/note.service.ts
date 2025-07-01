import instance from "@/lib/axios/instance";
import endpoint from "./endpoint.constants";
import { INote } from "@/type/Note";

const noteServices = {
  addNote: (payload: INote) => instance.post(`${endpoint.NOTE}`, payload),
  getNotes: () => instance.get(`${endpoint.NOTE}`),
};

export default noteServices;
