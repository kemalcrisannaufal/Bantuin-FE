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

export { ITransaction, ITransactionForm };
