import { ITransaction } from "@/type/Finance";
import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Pagination,
  Select,
  SelectItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { TABLE_COLUMNS } from "./transactionTable.constants";
import { toDateStandardFromAPI } from "@/utils/date";
import { CiMenuKebab } from "react-icons/ci";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { convertToIDR } from "@/utils/currency";
import { LIMIT_LIST } from "@/constants/queryRouter.constants";
import { toTitleCase } from "@/utils/text";

interface Proptypes {
  currentLimit: number;
  currentPage: number;
  handleChangeLimit: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleChangePage: (page: number) => void;
  totalPage: number;
  isLoading: boolean;
  onOpenDeleteModal: () => void;
  onOpenUpdateModal: () => void;
  setEnableAction: Dispatch<
    SetStateAction<{ update: boolean; delete: boolean }>
  >;
  setSelectedId: Dispatch<SetStateAction<string>>;
  transactionData: ITransaction[] | undefined;
}

const TransactionTable = (props: Proptypes) => {
  const {
    currentLimit,
    currentPage,
    handleChangeLimit,
    handleChangePage,
    totalPage,
    isLoading,
    onOpenDeleteModal,
    onOpenUpdateModal,
    setEnableAction,
    setSelectedId,
    transactionData,
  } = props;

  const bottomContent = (
    <div className="flex justify-between items-center">
      <Select
        items={LIMIT_LIST}
        disallowEmptySelection
        className="max-w-36"
        defaultSelectedKeys={`${currentLimit}`}
        startContent={<p className="text-sm">Limit:</p>}
        onChange={(e) => handleChangeLimit(e)}
      >
        {(limit) => <SelectItem>{limit.label}</SelectItem>}
      </Select>

      {totalPage > 1 && (
        <Pagination
          initialPage={currentPage}
          total={totalPage}
          isCompact={totalPage > 2}
          onChange={(page) => handleChangePage(page)}
          className="cursor-pointer"
        />
      )}
    </div>
  );

  return (
    <div className="mt-5 md:mt-10">
      <Table aria-label="Transaction table" bottomContent={bottomContent}>
        <TableHeader columns={TABLE_COLUMNS}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"Data transaksi tidak ditemukan"}
          isLoading={isLoading}
          items={transactionData || []}
          loadingContent={
            <div className="flex justify-center items-center bg-foreground-700/30 backdrop-blur w-full h-full">
              <Spinner color="primary" />
            </div>
          }
        >
          {(item) => (
            <TableRow key={`table-row-${item._id}`}>
              {(columnKey) => {
                switch (columnKey) {
                  case "date":
                    return (
                      <TableCell>{toDateStandardFromAPI(item.date)}</TableCell>
                    );
                  case "category":
                    return <TableCell>{toTitleCase(item.category)}</TableCell>;
                  case "amount":
                    return <TableCell>{convertToIDR(item.amount)}</TableCell>;
                  case "type":
                    return (
                      <TableCell>
                        <Chip
                          color={item.type === "income" ? "success" : "warning"}
                          size="sm"
                          variant="flat"
                        >
                          {item.type}
                        </Chip>
                      </TableCell>
                    );
                  case "name":
                    return <TableCell>{item.name}</TableCell>;
                  case "description":
                    return <TableCell>{item.description}</TableCell>;
                  case "actions":
                    return (
                      <TableCell>
                        <Dropdown>
                          <DropdownTrigger>
                            <button className="cursor-pointer">
                              <CiMenuKebab />
                            </button>
                          </DropdownTrigger>
                          <DropdownMenu>
                            <DropdownItem
                              key={"edit"}
                              color="primary"
                              as={Button}
                              className="bg-transparent text-left"
                              onPress={() => {
                                setSelectedId(`${item._id}`);
                                setEnableAction({
                                  update: true,
                                  delete: false,
                                });
                                onOpenUpdateModal();
                              }}
                            >
                              Edit
                            </DropdownItem>
                            <DropdownItem
                              key={"delete"}
                              color="primary"
                              as={Button}
                              onPress={() => {
                                setSelectedId(`${item._id}`);
                                setEnableAction({
                                  update: false,
                                  delete: true,
                                });
                                onOpenDeleteModal();
                              }}
                              className="bg-transparent text-left"
                            >
                              Delete
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </TableCell>
                    );
                  default:
                    return <TableCell>-</TableCell>;
                }
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionTable;
