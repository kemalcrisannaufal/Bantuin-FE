import { Card, CardBody } from "@heroui/react";
import { CiCoinInsert, CiShoppingBasket } from "react-icons/ci";
import useFinanceSummary from "./useFinanceSumary";
import AmountCard from "./AmountCard";
import TopCategoryListCard from "./TopCategoryListCard";

const FinanceSummary = () => {
  const {
    expenseTotal,
    incomeTotal,
    isLoadingTransactionTotalData,
    summaryCategoriesData,
  } = useFinanceSummary();

  return (
    <Card>
      <CardBody>
        <div>
          <h2 className="font-bold text-primary text-xl">Ringkasan Keuangan</h2>

          <div className="flex gap-5 overflow-x-auto scrollbar-hide">
            <div className="flex flex-col gap-3 p-1 md:w-1/2">
              <AmountCard
                amount={incomeTotal}
                isLoading={isLoadingTransactionTotalData}
                icon={<CiCoinInsert className="text-6xl" />}
                classname="bg-primary text-white w-full"
                title="Pendapatan"
              />

              {incomeTotal > 0 && (
                <TopCategoryListCard
                  summaryCategoriesData={summaryCategoriesData}
                  title="Pendapatan teratas"
                  type={"income"}
                />
              )}
            </div>

            <div className="flex flex-col gap-3 p-1 md:w-1/2">
              <AmountCard
                amount={expenseTotal}
                classname="text-foreground-700"
                isLoading={isLoadingTransactionTotalData}
                icon={<CiShoppingBasket className="text-primary text-6xl" />}
                title="Pengeluaran"
              />

              {expenseTotal > 0 && (
                <TopCategoryListCard
                  summaryCategoriesData={summaryCategoriesData}
                  title="Pengeluaran teratas"
                  type={"expense"}
                />
              )}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default FinanceSummary;
