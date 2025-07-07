import { ITransactionSummary } from "@/type/Finance";
import { convertToIDR } from "@/utils/currency";
import { Card, CardBody, Skeleton } from "@heroui/react";

interface Proptypes {
  summaryCategoriesData: ITransactionSummary[] | undefined;
  title: string;
  type: "income" | "expense";
}

const TopCategoryListCard = (props: Proptypes) => {
  const { title, summaryCategoriesData, type } = props;

  return (
    <div>
      <Card>
        <CardBody>
          <h5 className="mb-1.5 font-semibold text-primary text-xl">{title}</h5>

          <Skeleton
            isLoaded={summaryCategoriesData !== undefined}
            className="rounded-lg min-h-[80px]"
          >
            {summaryCategoriesData
              ?.find((item) => item._id === type)
              ?.categories.sort((a, b) => b.total - a.total)
              .slice(0, 3)
              .map((category) => (
                <div
                  key={`income-${category.category}`}
                  className="flex justify-between items-center mb-0.5"
                >
                  <p className="font-medium capitalize line-clamp-1">
                    {category.category}
                  </p>
                  <p className="text-sm">{convertToIDR(category.total)}</p>
                </div>
              ))}
          </Skeleton>
        </CardBody>
      </Card>
    </div>
  );
};

export default TopCategoryListCard;
