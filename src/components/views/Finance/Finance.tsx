/* eslint-disable react-hooks/exhaustive-deps */
import { Button, useDisclosure } from "@heroui/react";
import { FaPlus } from "react-icons/fa";
import AddFinanceModal from "./AddFinanceModal";
import useFinance from "./useFinance";

import TransactionTable from "./TransactionTable";
import DeleteFinanceModal from "./DeleteFinanceModal";
import UpdateFinanceModal from "./UpdateFinanceModal";
import { useEffect } from "react";
import TransactionFilter from "./TransactionFilter";
import TransactionOverview from "./TransactionOverview";

const Finance = () => {
  const {
    currentLimit,
    currentPage,
    handleChangeLimit,
    handleChangePage,
    handleChangeDate,
    handleChangeType,
    handleChangeCategory,
    setUrl,

    filter,
    resetFilter,

    enableAction,
    financeType,
    isPendingTransactions,
    refetchTransactions,
    selectedId,
    setEnableAction,
    setFinanceType,
    transactionData,
    setSelectedId,

    incomeTotal,
    expenseTotal,
    isLoadingTransactionTotalData,
  } = useFinance();

  useEffect(() => {
    setUrl();
  }, []);

  const addFinanceModal = useDisclosure();
  const updateFinanceModal = useDisclosure();
  const deleteFinanceModal = useDisclosure();

  return (
    <>
      <TransactionOverview
        isLoading={isLoadingTransactionTotalData}
        incomeTotal={incomeTotal}
        expenseTotal={expenseTotal}
      />

      <TransactionFilter
        filter={filter}
        handleChangeCategory={handleChangeCategory}
        handleChangeDate={handleChangeDate}
        handleChangeType={handleChangeType}
        resetFilter={resetFilter}
      />

      <div>
        <div className="mt-5 md:mt-10">
          <div className="flex justify-between items-center mb-5">
            <h2 className="mb-2 font-semibold text-primary text-xl">
              Transaksi Terbaru
            </h2>

            <div className="flex md:flex-row flex-col gap-5">
              <Button
                color="primary"
                variant="bordered"
                startContent={<FaPlus />}
                onPress={() => {
                  setFinanceType("income");
                  addFinanceModal.onOpen();
                }}
              >
                Tambah Pendapatan
              </Button>
              <Button
                color="primary"
                variant="flat"
                startContent={<FaPlus />}
                onPress={() => {
                  setFinanceType("expense");
                  addFinanceModal.onOpen();
                }}
              >
                Tambah Pengeluaran
              </Button>
            </div>
          </div>

          <TransactionTable
            isLoading={isPendingTransactions}
            currentLimit={Number(currentLimit)}
            currentPage={Number(currentPage)}
            handleChangeLimit={handleChangeLimit}
            handleChangePage={handleChangePage}
            totalPage={Number(transactionData?.pagination.totalPage)}
            transactionData={transactionData?.data}
            setEnableAction={setEnableAction}
            setSelectedId={setSelectedId}
            onOpenDeleteModal={deleteFinanceModal.onOpen}
            onOpenUpdateModal={updateFinanceModal.onOpen}
          />
        </div>
      </div>

      {financeType !== "" && (
        <AddFinanceModal
          {...addFinanceModal}
          refetchTransaction={refetchTransactions}
          type={financeType}
        />
      )}

      <UpdateFinanceModal
        {...updateFinanceModal}
        enableUpdate={enableAction.update}
        refetchTransaction={refetchTransactions}
        updatedId={selectedId}
        setSelectedUpdatedId={setSelectedId}
      />

      <DeleteFinanceModal
        {...deleteFinanceModal}
        deletedId={selectedId}
        refetchTransactions={refetchTransactions}
        setSelectedDeletedId={setSelectedId}
      />
    </>
  );
};

export default Finance;
