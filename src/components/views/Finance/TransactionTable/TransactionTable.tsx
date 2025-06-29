import { ITransaction } from "@/type/Finance";
import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
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
import { Dispatch, SetStateAction } from "react";

interface Proptypes {
  isLoading: boolean;
  onOpenDeleteModal: () => void;
  onOpenUpdateModal: () => void;
  setSelectedId: Dispatch<SetStateAction<string>>;
  transactionData: ITransaction[] | undefined;
}

const TransactionTable = (props: Proptypes) => {
  const {
    isLoading,
    onOpenDeleteModal,
    onOpenUpdateModal,
    setSelectedId,
    transactionData,
  } = props;
  return (
    <div className="mt-10">
      <h2 className="mb-2 font-semibold text-primary text-xl">
        Transaksi Terbaru
      </h2>
      <Table aria-label="Transaction table">
        <TableHeader columns={TABLE_COLUMNS}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
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
                    return <TableCell>{item.category}</TableCell>;
                  case "amount":
                    return <TableCell>{item.amount}</TableCell>;
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
