/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Chip,
  Pagination,
  Select,
  SelectItem,
  Skeleton,
  useDisclosure,
} from "@heroui/react";
import { FaPlus } from "react-icons/fa";
import AddTodosModal from "./AddTodosModal";
import useTodos from "./useTodos";
import DeleteTodosModal from "./DeleteTodosModal";
import UpdateTodosModal from "./UpdateTodosModal";
import { useEffect } from "react";
import useUrl from "@/hooks/useUrl";
import { LIMIT_LIST } from "@/constants/queryRouter.constants";
import TodosList from "./TodosList";
import SearchInput from "@/components/ui/SearchInput";

const Todos = () => {
  const {
    selectedId,
    setSelectedId,

    isLoadingTodosData,
    refetchTodosData,
    todosData,

    handleUpdateStatus,
    isPendingUpdateStatus,
    isSuccessUpdateStatus,
  } = useTodos();

  const {
    currentLimit,
    currentPage,

    currentTodosRange,
    currentTodosStatus,
    currentTodosUpcoming,

    handleChangeLimit,
    handleChangePage,
    handleChangeSearch,

    handleChangeTodosRange,
    handleChangeTodosStatus,
    handleChangeTodosUpcoming,

    setTodosUrl,
  } = useUrl();

  useEffect(() => {
    setTodosUrl();
  }, []);

  const addTodosModal = useDisclosure();
  const updateTodosModal = useDisclosure();
  const deleteTodosModal = useDisclosure();

  useEffect(() => {
    if (isSuccessUpdateStatus) {
      refetchTodosData();
    }
  }, [isSuccessUpdateStatus, refetchTodosData]);

  const topContent = (
    <div className="flex xl:flex-row flex-col justify-between xl:items-center gap-4 mt-8 w-full">
      <div className="flex items-center gap-2">
        <h2 className="w-max font-bold text-primary text-xl">Tugas Anda</h2>
        <Skeleton isLoaded={!!todosData} className="rounded-full w-8 h-8">
          <Chip radius="full" color="primary" className="w-8 h-8">
            {todosData?.pagination.total}
          </Chip>
        </Skeleton>
      </div>

      <div className="flex flex-wrap xl:justify-end items-center gap-2 w-full">
        <Select
          className="w-full max-w-56"
          label="Batas waktu hingga"
          defaultSelectedKeys={new Set([`${currentTodosRange}`])}
          onChange={(e) => handleChangeTodosRange(e)}
        >
          <SelectItem key="">Semua</SelectItem>
          <SelectItem key="today">Hari Ini</SelectItem>
          <SelectItem key="tomorrow">Besok</SelectItem>
          <SelectItem key="next7">Satu Minggu Kedepan</SelectItem>
          <SelectItem key="next30">Satu Bulan Kedepan</SelectItem>
          <SelectItem key="overdue">Kedaluwarsa</SelectItem>
        </Select>

        <Select
          className="w-full max-w-42"
          defaultSelectedKeys={new Set([`${currentTodosStatus}`])}
          label="Status"
          onChange={(e) => handleChangeTodosStatus(e)}
        >
          <SelectItem key="">Semua</SelectItem>
          <SelectItem key="pending">Belum Selesai</SelectItem>
          <SelectItem key="completed">Selesai</SelectItem>
        </Select>

        <Select
          className="w-full max-w-32"
          defaultSelectedKeys={new Set([`${currentTodosUpcoming}`])}
          label="Mendatang"
          onChange={(e) => handleChangeTodosUpcoming(e)}
        >
          <SelectItem key="true">Ya</SelectItem>
          <SelectItem key="false">Tidak</SelectItem>
        </Select>
      </div>
    </div>
  );

  const bottomContent = (
    <div className="flex justify-between items-center">
      <Select
        className="max-w-28"
        startContent={<p>Limit: </p>}
        selectionMode="single"
        disallowEmptySelection
        defaultSelectedKeys={new Set([`${currentLimit}`])}
        items={LIMIT_LIST}
        onChange={(e) => handleChangeLimit(e)}
      >
        {(limit) => <SelectItem key={limit.key}>{limit.label}</SelectItem>}
      </Select>

      {Number(todosData?.pagination.totalPage) > 1 && (
        <Pagination
          className="cursor-pointer"
          initialPage={Number(currentPage)}
          total={Number(todosData?.pagination.totalPage)}
          onChange={(page) => handleChangePage(page)}
          isCompact={Number(todosData?.pagination.totalPage) > 2}
        />
      )}
    </div>
  );

  return (
    <>
      <div className="flex items-center gap-5">
        <SearchInput
          placeholder="Cari tugas..."
          onChange={handleChangeSearch}
        />

        <Button
          color="primary"
          startContent={<FaPlus />}
          onPress={addTodosModal.onOpen}
          className="min-w-max"
        >
          <span className="hidden md:block">Tambah</span> Tugas
        </Button>
      </div>

      <TodosList
        bottomContent={bottomContent}
        todos={todosData?.data}
        handleUpdateStatus={handleUpdateStatus}
        isLoading={isLoadingTodosData}
        isPendingUpdateStatus={isPendingUpdateStatus}
        onOpenDeleteTodosModal={deleteTodosModal.onOpen}
        onOpenUpdateTodosModal={updateTodosModal.onOpen}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        topContent={topContent}
      />

      <AddTodosModal {...addTodosModal} refetchTodos={refetchTodosData} />
      <UpdateTodosModal
        {...updateTodosModal}
        refetchTodos={refetchTodosData}
        updatedId={selectedId}
        setUpdatedId={setSelectedId}
      />
      <DeleteTodosModal
        {...deleteTodosModal}
        deletedId={selectedId}
        refetchTodos={refetchTodosData}
        setDeletedId={setSelectedId}
      />
    </>
  );
};

export default Todos;
