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
  Skeleton,
  Spinner,
  Textarea,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import {
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
} from "@/constants/list.constants";
import { Dispatch, SetStateAction, useEffect } from "react";
import useUpdateFinanceModal from "./useUpdateFinanceModal";
import { toInputDate } from "@/utils/date";

interface Proptypes {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  refetchTransaction: () => void;
  setSelectedUpdatedId: Dispatch<SetStateAction<string>>;
  updatedId: string;
}

const UpdateFinanceModal = (props: Proptypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    refetchTransaction,
    setSelectedUpdatedId,
    updatedId,
  } = props;

  const {
    isLoadingTransactionDetailData,
    transactionDetailData,

    control,
    errors,
    handleSubmit,
    setValue,

    handleUpdateTransaction,
    isPendingUpdateTransaction,
    isSuccessUpdateTransaction,
  } = useUpdateFinanceModal(updatedId);

  useEffect(() => {
    if (transactionDetailData) {
      setValue("name", transactionDetailData?.name || "");
      setValue("description", transactionDetailData?.description || "");
      setValue("date", toInputDate(transactionDetailData.date));
      setValue("amount", `${transactionDetailData?.amount}` || "");
      setValue("category", transactionDetailData?.category || "");
    }
  }, [setValue, transactionDetailData]);

  useEffect(() => {
    if (isSuccessUpdateTransaction) {
      refetchTransaction();
      onClose();
    }
  }, [isSuccessUpdateTransaction, refetchTransaction, onClose]);

  const disabledButton =
    isPendingUpdateTransaction || isLoadingTransactionDetailData;

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setSelectedUpdatedId("");
        onClose();
      }}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        <ModalHeader>Edit Pendapatan</ModalHeader>
        <ModalBody>
          <form
            onSubmit={handleSubmit(handleUpdateTransaction)}
            className="flex flex-col gap-4"
          >
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <Skeleton
                  isLoaded={!isLoadingTransactionDetailData}
                  className="rounded-xl"
                >
                  <Input
                    {...field}
                    label="Nama transaksi"
                    variant="bordered"
                    autoFocus
                    isInvalid={errors.name !== undefined}
                    errorMessage={errors.name?.message}
                  />
                </Skeleton>
              )}
            />

            <Controller
              control={control}
              name="category"
              render={({ field: { onChange, value, ...field } }) => (
                <Skeleton
                  isLoaded={!isLoadingTransactionDetailData}
                  className="rounded-xl"
                >
                  <Autocomplete
                    {...field}
                    items={
                      transactionDetailData?.type === "income"
                        ? INCOME_CATEGORIES
                        : EXPENSE_CATEGORIES
                    }
                    selectedKey={value}
                    inputValue={
                      value
                        ? transactionDetailData?.type === "income"
                          ? INCOME_CATEGORIES.find((c) => c.key === value)
                              ?.label
                          : EXPENSE_CATEGORIES.find((c) => c.key === value)
                              ?.label
                        : ""
                    }
                    label="Kategori"
                    variant="bordered"
                    isInvalid={!!errors.category}
                    errorMessage={errors.category?.message}
                    onSelectionChange={(key) => {
                      onChange(key);
                    }}
                  >
                    {(category) => (
                      <AutocompleteItem key={category.key}>
                        {category.label}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                </Skeleton>
              )}
            />

            <Controller
              control={control}
              name="date"
              render={({ field }) => (
                <Skeleton
                  isLoaded={!isLoadingTransactionDetailData}
                  className="rounded-xl"
                >
                  <DatePicker
                    {...field}
                    label="Tanggal Transaksi"
                    variant="bordered"
                    showMonthAndYearPickers
                    hideTimeZone
                    isInvalid={errors.date !== undefined}
                    errorMessage={errors.date?.message}
                  />
                </Skeleton>
              )}
            />

            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <Skeleton
                  isLoaded={!isLoadingTransactionDetailData}
                  className="rounded-xl"
                >
                  <Textarea
                    {...field}
                    label="Deskripsi/rincian transaksi"
                    variant="bordered"
                    isInvalid={errors.description !== undefined}
                    errorMessage={errors.description?.message}
                  />
                </Skeleton>
              )}
            />

            <Controller
              control={control}
              name="amount"
              render={({ field: { onChange, ...field } }) => (
                <Skeleton
                  isLoaded={!isLoadingTransactionDetailData}
                  className="rounded-xl"
                >
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
                </Skeleton>
              )}
            />

            <Button
              type="submit"
              variant="solid"
              color="primary"
              className="disabled:opacity-50 disabled:cursor-default"
              disabled={disabledButton}
            >
              {disabledButton ? (
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

export default UpdateFinanceModal;
