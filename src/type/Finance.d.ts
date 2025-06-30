import { ITransaction } from "@/type/Finance";
import { DateValue } from "@heroui/react";

interface ITransaction {
  _id?: string;
  name: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  type: "income" | "expense";
  userId?: string;
}

interface ITransactionForm
  extends Omit<ITransaction, "amount" | "date" | "type"> {
  amount: string;
  date: DateValue;
}

interface ITransactionFilter {
  category: string;
  type: "" | "income" | "expense";
  month: number;
  year: number;
}

interface ITransactionTotal {
  _id: null;
  totalIncome: number;
  totalExpense: number;
  count: number;
}

interface ITransactionSummary {
  _id: "income" | "expense";
  categories: { category: string; total: number }[];
}

export {
  ITransaction,
  ITransactionForm,
  ITransactionFilter,
  ITransactionTotal,
  ITransactionSummary,
};
