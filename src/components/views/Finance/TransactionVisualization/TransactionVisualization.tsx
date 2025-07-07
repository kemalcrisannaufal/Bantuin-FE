import BarChart from "@/components/ui/BarChart";
import PieChart from "@/components/ui/PieChart";
import { COLORS } from "@/constants/list.constants";
import { IChartData } from "@/type/Chart";
import { ITransactionSummary } from "@/type/Finance";
import { Select, SelectItem, Spinner } from "@heroui/react";
import useTransactionVisualization from "./useTransactionVisualization";
import { toTitleCase } from "@/utils/text";
import Image from "next/image";

interface Proptypes {
  expenseTotal: number;
  isLoading: boolean;
  incomeTotal: number;
  categoriesSummary: ITransactionSummary[] | undefined;
}

const TransactionVisualization = (props: Proptypes) => {
  const { expenseTotal, isLoading, incomeTotal, categoriesSummary } = props;
  const { type, handleChangeType } = useTransactionVisualization();

  const barChartData: IChartData = {
    labels: ["Total"],
    datasets: [
      {
        label: "Pendapatan",
        data: [incomeTotal],
        backgroundColor: "#0090FF",
      },
      {
        label: "Pengeluaran",
        data: [expenseTotal],
        backgroundColor: "#FF2D55",
      },
    ],
  };

  const pieChartIncomeData: IChartData = {
    labels:
      categoriesSummary
        ?.find((item) => item._id === type)
        ?.categories.map((summary) => toTitleCase(summary.category)) || [],
    datasets: [
      {
        label: "Total",
        data:
          categoriesSummary
            ?.find((sum) => sum._id === type)
            ?.categories.map((item) => item.total) || [],
        backgroundColor: COLORS,
      },
    ],
  };

  return (
    <>
      <h2 className="mt-5 md:mt-10 mb-2 font-semibold text-primary text-xl">
        Transaksi Anda
      </h2>
      {isLoading ? (
        <div className="flex justify-center items-center bg-neutral-200 p-4 rounded-xl w-full text-foreground-600">
          <Spinner color="primary" />
        </div>
      ) : incomeTotal === 0 && expenseTotal === 0 ? (
        <div className="flex justify-center items-center bg-white p-4 border border-neutral-300 rounded-xl w-full text-foreground-600">
          <Image
            src="/images/illustrations/data-not-found.jpg"
            alt="data not found"
            width={150}
            height={150}
          />
          Data Transaksi Tidak Ditemukan
        </div>
      ) : (
        <div className="flex md:flex-row flex-col gap-5">
          <div className="w-full md:w-2/3">
            <BarChart
              chartTitle={`Pendapatan dan Pengeluaran`}
              data={barChartData}
            />
          </div>

          <div className="relative p-2 w-full md:w-1/3">
            <Select
              aria-label="transaction-type-filter"
              className="right-0 absolute max-w-48"
              color="primary"
              disallowEmptySelection
              onChange={(e) => handleChangeType(e)}
              selectedKeys={new Set([type])}
              selectionMode="single"
              size="sm"
              startContent={<p className="text-sm">Tipe:</p>}
            >
              <SelectItem key={"income"}>Pendapatan</SelectItem>
              <SelectItem key={"expense"}>Pengeluaran</SelectItem>
            </Select>

            <PieChart data={pieChartIncomeData} />
          </div>
        </div>
      )}
    </>
  );
};

export default TransactionVisualization;
