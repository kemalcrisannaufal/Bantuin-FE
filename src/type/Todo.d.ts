import { DateValue } from "@heroui/react";

interface ITodo {
  _id?: string;
  title: string;
  description?: string;
  dueDate: string;
  status?: string;
}

interface ITodoForm extends Omit<ITodo, "_id" | "dueDate" | "status"> {
  dueDate: DateValue;
}

export { ITodo, ITodoForm };
