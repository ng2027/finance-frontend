import { ReactElement, useCallback, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Tooltip,
  Pagination,
} from "@nextui-org/react";
import { EyeIcon, DeleteIcon, EditIcon } from "@/lib/icon";
import { Layout } from "@/lib/(auth)/layout";
import { Button, Spin, Typography } from "antd";
import { BuildTime } from "@/utils/buildTime";
import { BuildCategory } from "@/utils/buildCategory";
import { useTransactionsQuery } from "@/hooks/useTransactionApi";
import { LoadingOutlined } from "@ant-design/icons";

import { DropDownCategory } from "@/lib/category/categoryDropDown";
import { AddTransaction } from "@/lib/transaction";
const { Text, Title } = Typography;
function desciptionSummary(description: string) {
  if (description.length < 60) {
    return description;
  } else {
    return "first " + description.substring(0, 60) + "...";
  }
}

const antIcon = (
  <LoadingOutlined style={{ fontSize: 100, color: "black" }} spin />
);

function TopTable({ filter, setFilter }: { filter: any; setFilter: any }) {
  return (
    <div className="flex justify-between">
      <Title level={3}>Transactions</Title>
      <div className="flex flex-row gap-x-3">
        <DropDownCategory selectedKeys={filter} setSelectedKeys={setFilter} />
        <AddTransaction />
      </div>
    </div>
  );
}

export default function Transaction() {
  const [selectedKeys, setSelectedKeys] = useState([""]);
  const [filter, setFilter] = useState<any>(["all"]);
  const [queryOption, setQueryOption] = useState({
    limit: 9,
    offset: 0,
    filter: "all",
  });
  const [page, setPage] = useState(1);

  const { transactionData, isLoading } = useTransactionsQuery({
    limit: queryOption.limit,
    offset: queryOption.offset,
    filter: queryOption.filter,
  });

  useEffect(() => {
    setTimeout(() => {
      setQueryOption((prev) => ({
        ...prev,
        filter: Array.from(filter).join(", "),
      }));
    }, 250);
  }, [filter]);

  const renderCell = useCallback((user: any, columnKey: any) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return <div className="py-2 font-bold">{cellValue}</div>;
      case "description":
        return <Text type="secondary">{desciptionSummary(cellValue)}</Text>;
      case "date":
        return <div>{BuildTime(cellValue)}</div>;
      case "amount":
        return (
          <div
            className="bg-slate-200 justify-center flex rounded-lg p-1"
            style={{
              backgroundColor: user.transaction_is_spending
                ? "#FFCCCC"
                : "#CCFFCC",
            }}
          >
            <div>${cellValue}</div>
          </div>
        );
      case "category":
        return <BuildCategory categoryID={cellValue} full={true} />;
      case "actions":
        return (
          <div className="relative flex items-center gap-2 flex-row flex-auto">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return <div className="py-2">{cellValue}</div>;
    }
  }, []);

  if (!transactionData) {
    return (
      <div className="h-screen relative">
        <div
          className=" absolute  left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{ top: "40%" }}
        >
          <Spin indicator={antIcon} className="flex" />
        </div>
      </div>
    );
  }

  const columns: Array<any> = [
    { key: "dash", label: "", width: "2%" },
    {
      key: "name",
      label: "Name",
      width: "13%",
    },
    {
      key: "description",
      label: "Description",
      width: "25%",
    },
    {
      key: "amount",
      label: "Amount",
      class: "",
      width: "12%",
    },
    {
      key: "date",
      label: "Date",
      width: "17%",
    },
    {
      key: "category",
      label: "Category",
      width: "17%",
    },
    { key: "actions", label: "Actions", width: "10%" },
  ];

  const rows = transactionData.transactions;
  console.log(rows);
  function handlePagination(page: any) {
    setQueryOption((prev) => ({
      ...prev,
      offset: (page - 1) * prev.limit,
    }));
    setPage(page);
  }

  return (
    <div className="h-screen p-10 relative">
      <div className=" sm:absolute sm:top-1/2 sm:px-2 w-full xl:w-5/6 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2 max-h-[90vh] sm:max-h-[95vh] overflow-auto ">
        <Table
          // className="min-h-[100px]"

          aria-label="Transactions"
          selectionMode="single"
          color={"secondary"}
          selectedKeys={selectedKeys}
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={page}
                total={Math.ceil(
                  transactionData.countTotal / queryOption.limit
                )}
                onChange={(page) => handlePagination(page)}
              />
            </div>
          }
          topContent={<TopTable filter={filter} setFilter={setFilter} />}
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.key}
                className={"text-md text-black p-2 "}
                align="center"
                width={column?.width || 0}
              >
                {column.label}
              </TableColumn>
            )}
          </TableHeader>

          <TableBody items={rows} emptyContent={"No transactions to display."}>
            {(item: any) => (
              <TableRow key={item._id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

Transaction.getLayout = function PageLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
