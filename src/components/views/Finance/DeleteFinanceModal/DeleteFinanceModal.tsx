import { Dispatch, SetStateAction, useEffect } from "react";
import useDeleteFinanceModal from "./useDeleteFinanceModal";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";

interface Proptypes {
  deletedId: string;
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchTransactions: () => void;
  setSelectedDeletedId: Dispatch<SetStateAction<string>>;
}

const DeleteFinanceModal = (props: Proptypes) => {
  const {
    deletedId,
    isOpen,
    onClose,
    onOpenChange,
    refetchTransactions,
    setSelectedDeletedId,
  } = props;
  const { handleDeleteTransaction, isPendingDelete, isSuccessDelete } =
    useDeleteFinanceModal();

  useEffect(() => {
    if (isSuccessDelete) {
      refetchTransactions();
      onClose();
    }
  }, [isSuccessDelete, refetchTransactions, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={() => {
        setSelectedDeletedId("");
        onClose();
      }}
    >
      <ModalContent>
        <ModalHeader>Hapus Data Transaksi</ModalHeader>
        <ModalBody>
          <p>Apakah kamu yakin ingin menghapus data transaksi?</p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            variant="solid"
            onPress={() => handleDeleteTransaction(deletedId)}
          >
            {isPendingDelete ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Ya, saya yakin"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteFinanceModal;
