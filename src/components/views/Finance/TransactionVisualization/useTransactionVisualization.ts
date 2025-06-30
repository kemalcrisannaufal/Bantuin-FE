import { ChangeEvent, useState } from "react";

const useTransactionVisualization = () => {
  const [type, setType] = useState<"income" | "expense">("income");

  const handleChangeType = (e: ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value as "income" | "expense";
    setType(type);
  };

  return { type, handleChangeType };
};

export default useTransactionVisualization;
