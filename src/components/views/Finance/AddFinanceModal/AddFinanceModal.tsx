import {
  Autocomplete,
  AutocompleteItem,
  Button,
  DatePicker,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spinner,
  Textarea,
} from "@heroui/react";

import { Controller } from "react-hook-form";
import {
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
} from "@/constants/transactionCategory.constants";
import useAddFinanceModal from "./useAddFinanceModal";
import { useEffect } from "react";

interface Proptypes {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  refetchTransaction: () => void;
  type: "income" | "expense";
}

const AddFinanceModal = (props: Proptypes) => {
  const { isOpen, onClose, onOpenChange, refetchTransaction, type } = props;

  const {
    control,
    errors,
    handleAddTransaction,
    handleSubmit,
    isPendingAddTransaction,
    isSuccessAddTransaction,
  } = useAddFinanceModal(type);

  useEffect(() => {
    if (isSuccessAddTransaction) {
      refetchTransaction();
      onClose();
    }
  }, [isSuccessAddTransaction, refetchTransaction, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>
          Tambah {type === "income" ? "Pendapatan" : "Pengeluaran"}
        </ModalHeader>
        <ModalBody>
          <form
            onSubmit={handleSubmit(handleAddTransaction)}
            className="flex flex-col gap-4"
          >
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <Input
                  {...field}
                  label="Nama transaksi"
                  variant="bordered"
                  autoFocus
                  isInvalid={errors.name !== undefined}
                  errorMessage={errors.name?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="category"
              render={({ field: { onChange, ...field } }) => (
                <Autocomplete
                  {...field}
                  defaultItems={
                    type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES
                  }
                  label="Kategori"
                  variant="bordered"
                  isInvalid={errors.category !== undefined}
                  errorMessage={errors.category?.message}
                  onSelectionChange={(value) => onChange(value)}
                >
                  {(category) => (
                    <AutocompleteItem key={category.key}>
                      {category.label}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              )}
            />
            <Controller
              control={control}
              name="date"
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="Tanggal Transaksi"
                  variant="bordered"
                  showMonthAndYearPickers
                  hideTimeZone
                  isInvalid={errors.date !== undefined}
                  errorMessage={errors.date?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="Deskripsi/rincian transaksi"
                  variant="bordered"
                  isInvalid={errors.description !== undefined}
                  errorMessage={errors.description?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="amount"
              render={({ field: { onChange, ...field } }) => (
                <Input
                  {...field}
                  label="Jumlah transaksi"
                  variant="bordered"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9]+$/.test(value)) {
                      onChange(value);
                    }
                  }}
                  isInvalid={errors.amount !== undefined}
                  errorMessage={errors.amount?.message}
                />
              )}
            />
            <Button
              type="submit"
              variant="solid"
              color="primary"
              className="disabled:opacity-50 disabled:cursor-default"
              disabled={isPendingAddTransaction}
            >
              {isPendingAddTransaction ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Simpan Transaksi"
              )}
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddFinanceModal;
