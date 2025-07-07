import { cn } from "@/utils/cn";
import { convertToIDR } from "@/utils/currency";
import { Card, CardBody, Skeleton } from "@heroui/react";
import { ReactNode } from "react";

interface Proptypes {
  amount: number;
  icon: ReactNode;
  isLoading: boolean;
  classname?: string;
  title: string;
}

const AmountCard = (props: Proptypes) => {
  const { amount, icon, isLoading, classname, title } = props;
  return (
    <div>
      <Card className={cn("mt-3 w-full", classname)}>
        <CardBody className="p-5">
          <div className="flex items-center gap-4">
            {icon}

            <div className="w-full">
              <h5 className="font-bold text-xl">{title}</h5>
              <Skeleton
                isLoaded={!isLoading}
                className="mt-1 rounded-lg w-full"
              >
                <p className="font-bold text-xl md:text-2xl">
                  {convertToIDR(amount)}
                </p>
              </Skeleton>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
export default AmountCard;
