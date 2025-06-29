import { Button, useDisclosure } from "@heroui/react";
import { FaPlus } from "react-icons/fa";
import AddFinanceModal from "./AddFinanceModal";
import useFinance from "./useFinance";

import TransactionTable from "./TransactionTable";
import DeleteFinanceModal from "./DeleteFinanceModal";
import UpdateFinanceModal from "./UpdateFinanceModal";

const Finance = () => {
  const {
    financeType,
    isPendingTransactions,
    refetchTransactions,
    selectedId,
    setFinanceType,
    transactionData,
    setSelectedId,
  } = useFinance();

  const addFinanceModal = useDisclosure();
  const updateFinanceModal = useDisclosure();
  const deleteFinanceModal = useDisclosure();

  return (
    <>
      <div>
        <div className="flex gap-5">
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

        <TransactionTable
          isLoading={isPendingTransactions}
          transactionData={transactionData}
          setSelectedId={setSelectedId}
          onOpenDeleteModal={deleteFinanceModal.onOpen}
          onOpenUpdateModal={updateFinanceModal.onOpen}
        />
      </div>

      {financeType !== "" && (
        <>
          <AddFinanceModal
            {...addFinanceModal}
            refetchTransaction={refetchTransactions}
            type={financeType}
          />
        </>
      )}

      {selectedId !== "" && (
        <>
          <UpdateFinanceModal
            {...updateFinanceModal}
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
      )}
    </>
  );
};

export default Finance;
