import { MONTHS, YEARS } from "@/constants/list.constants";
import {
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
} from "@/constants/transactionCategory.constants";
import { ITransactionFilter } from "@/type/Finance";
import { Button, Select, SelectItem } from "@heroui/react";
import { ChangeEvent } from "react";

interface Proptypes {
  filter: ITransactionFilter;
  handleChangeCategory: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleChangeDate: (
    e: ChangeEvent<HTMLSelectElement>,
    type: "month" | "year"
  ) => void;
  handleChangeType: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleExportData: () => void;
  resetFilter: () => void;
  totalData: number;
}

const TransactionFilter = (props: Proptypes) => {
  const {
    filter,
    handleChangeCategory,
    handleChangeDate,
    handleChangeType,
    handleExportData,
    resetFilter,
    totalData,
  } = props;

  return (
    <div className="mt-5 md:mt-10">
      <h2 className="mb-2 font-semibold text-primary text-xl">
        Filter Transaksi
      </h2>

      <div className="flex justify-between items-center">
        <div className="flex flex-wrap items-center gap-2 w-full">
          <Select
            aria-label="month-filter"
            label="Bulan"
            items={MONTHS}
            selectedKeys={new Set([`${filter.month}`])}
            selectionMode="single"
            disallowEmptySelection
            onChange={(e) => handleChangeDate(e, "month")}
            className="w-full md:max-w-32"
          >
            {(month) => <SelectItem key={month.key}>{month.label}</SelectItem>}
          </Select>

          <Select
            aria-label="year-filter"
            label="Tahun"
            items={YEARS}
            selectedKeys={new Set([`${filter.year}`])}
            selectionMode="single"
            disallowEmptySelection
            onChange={(e) => handleChangeDate(e, "year")}
            className="w-full md:max-w-28"
          >
            {(year) => <SelectItem key={year.key}>{year.label}</SelectItem>}
          </Select>

          <Select
            aria-label="type-filter"
            label="Tipe Transaksi"
            selectedKeys={new Set([`${filter.type}`])}
            selectionMode="single"
            disallowEmptySelection
            onChange={(e) => handleChangeType(e)}
            className="w-full md:max-w-64"
          >
            <SelectItem key={""}>Tidak ada filter diterapkan</SelectItem>
            <SelectItem key={"income"}>Pendapatan</SelectItem>
            <SelectItem key={"expense"}>Pengeluaran</SelectItem>
          </Select>

          {filter.type !== "" && (
            <Select
              aria-label="category-selection"
              label="Kategori"
              items={
                filter.type === "income"
                  ? INCOME_CATEGORIES
                  : EXPENSE_CATEGORIES
              }
              selectedKeys={new Set([`${filter.category}`])}
              selectionMode="single"
              disallowEmptySelection
              className="w-full md:max-w-64"
              onChange={(e) => handleChangeCategory(e)}
            >
              {(category) => (
                <SelectItem key={category.key}>{category.label}</SelectItem>
              )}
            </Select>
          )}

          <Button
            aria-label="reset"
            color="primary"
            onPress={resetFilter}
            className="mt-1.5 md:mt-0"
          >
            Hapus Filter
          </Button>
        </div>
        <Button
          variant="bordered"
          color="success"
          onPress={handleExportData}
          disabled={totalData === 0}
          className="disabled:hover:opacity-50 disabled:opacity-50 disabled:cursor-default"
        >
          Export Data
        </Button>
      </div>
    </div>
  );
};

export default TransactionFilter;
