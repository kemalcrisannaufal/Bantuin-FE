import instance from "@/lib/axios/instance";
import endpoint from "./endpoint.constants";
import { ITodo } from "@/type/Todo";

const todoServices = {
  createTodos: (payload: ITodo) => instance.post(`${endpoint.TODO}`, payload),
  getTodos: (params?: string) => instance.get(`${endpoint.TODO}?${params}`),
  getTodoById: (id: string) => instance.get(`${endpoint.TODO}/${id}`),
  updateTodos: (id: string, payload: ITodo) =>
    instance.put(`${endpoint.TODO}/${id}`, payload),
  updateStatus: (id: string) =>
    instance.patch(`${endpoint.TODO}/${id}/status`),
  deleteTodosById: (id: string) => instance.delete(`${endpoint.TODO}/${id}`),
};

export default todoServices;
