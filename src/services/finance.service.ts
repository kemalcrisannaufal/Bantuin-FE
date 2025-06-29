import instance from "@/lib/axios/instance";
import endpoint from "./endpoint.constants";
import { ITransaction } from "@/type/Finance";

const financeServices = {
  createTransaction: (payload: ITransaction) =>
    instance.post(`${endpoint.FINANCE}`, payload),
  getTransactionById: (id: string) => instance.get(`${endpoint.FINANCE}/${id}`),
  getTransactions: (params?: string) =>
    instance.get(`${endpoint.FINANCE}?${params}`),
  updateTransaction: (payload: ITransaction, id: string) =>
    instance.put(`${endpoint.FINANCE}/${id}`, payload),
  deleteTransaction: (id: string) =>
    instance.delete(`${endpoint.FINANCE}/${id}`),
};

export default financeServices;
