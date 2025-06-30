import { convertToIDR } from "@/utils/currency";
import { Card, CardBody, Skeleton } from "@heroui/react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

interface Proptypes {
  expenseTotal: number;
  incomeTotal: number;
  isLoading: boolean;
}

const TransactionOverview = (props: Proptypes) => {
  const { isLoading, incomeTotal, expenseTotal } = props;
  return (
    <Card className="gap-2 grid md:grid-cols-2 grid-flow-col auto-cols-max bg-neutral-200 p-1 w-full overflow-x-auto hide-scrollbar">
      <Card className="p-2 w-full">
        <CardBody>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-bold text-primary text-2xl">Pendapatan</h3>
            <FaArrowUp className="text-primary text-xl" />
          </div>

          <Skeleton isLoaded={!isLoading} className="rounded-xl">
            <span className="font-medium text-foreground-600 text-2xl">
              {convertToIDR(incomeTotal)}
            </span>
          </Skeleton>
        </CardBody>
      </Card>

      <Card className="p-2 w-full">
        <CardBody>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-bold text-primary text-2xl">Pengeluaran</h3>
            <FaArrowDown className="text-primary text-xl" />
          </div>

          <Skeleton isLoaded={!isLoading} className="rounded-xl">
            <span className="font-medium text-foreground-600 text-2xl">
              {convertToIDR(expenseTotal)}
            </span>
          </Skeleton>
        </CardBody>
      </Card>
    </Card>
  );
};

export default TransactionOverview;
