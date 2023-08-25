import { ReactElement, useCallback, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";
import { Layout } from "@/lib/(auth)/layout";
import { Spin, Typography } from "antd";
import { BuildCategory } from "@/utils/buildCategory";
import { useSubscriptionsQuery } from "@/hooks/useSubscriptionApi";
import { LoadingOutlined } from "@ant-design/icons";
import {
  AddSubscription,
  ViewSubscription,
  EditSubscription,
  DeleteSubscription,
  UpcomingSubscription,
} from "@/lib/subscription";
import { DropDownCategory } from "@/lib/category/categoryDropDown";

const { Title } = Typography;

const columns = [
  { key: "category", label: "", width: "4%" },
  {
    key: "name",
    label: "Name",
    width: "30%",
  },
  {
    key: "amount",
    label: "Amount",
  },
  {
    key: "lastpaid",
    label: "Last Paid",
  },

  { key: "actions", label: "Actions", width: "10%" },
];

const antIcon = (
  <LoadingOutlined style={{ fontSize: 100, color: "black" }} spin />
);

export default function Subscription() {
  const [page, setPage] = useState(1);
  const [selectedKeys, setSelectedKeys] = useState([""]);
  const [filter, setFilter] = useState<any>(["all"]);
  const [queryOption, setQueryOption] = useState({
    limit: 4,
    offset: 0,
    filter: "all",
  });
  const { subscriptionData, isLoading } = useSubscriptionsQuery({
    limit: queryOption.limit,
    offset: queryOption.offset,
    filter: queryOption.filter,
  });
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const updateScreenHeight = () => {
    setScreenHeight(window.innerHeight);
  };
  useEffect(() => {
    window.addEventListener("resize", updateScreenHeight);
    return () => {
      window.removeEventListener("resize", updateScreenHeight);
    };
  }, []);
  useEffect(() => {
    if (screenHeight < 740) {
      setQueryOption((prev) => ({
        ...prev,
        limit: 3,
      }));
    } else {
      setQueryOption((prev) => ({
        ...prev,
        limit: 4,
      }));
    }
  }, [screenHeight]);
  useEffect(() => {
    setQueryOption((prev) => ({
      ...prev,
      filter: Array.from(filter).join(", "),
    }));
  }, [filter]);

  const renderCell = useCallback((subscription: any, columnKey: any) => {
    const cellValue = subscription[columnKey];

    switch (columnKey) {
      case "category":
        return (
          <BuildCategory categoryID={subscription.category} full={false} />
        );
      case "name":
        return <div className="py-1 font-bold">{cellValue}</div>;
      case "lastpaid":
        return (
          <div>
            {subscription.date}/{subscription.last_month}/
            {subscription.last_year}
          </div>
        );

      case "amount":
        return (
          <div
            className="bg-slate-200 justify-center flex rounded-lg p-1"
            style={{
              backgroundColor: subscription.transaction_is_spending
                ? "#FFCCCC"
                : "#CCFFCC",
            }}
          >
            <div>${cellValue}</div>
          </div>
        );

      case "actions":
        return (
          <div className="relative flex items-center gap-2 flex-row flex-auto">
            <ViewSubscription data={subscription} />
            <EditSubscription data={subscription} />
            <DeleteSubscription data={subscription} />
          </div>
        );
      default:
        return <div className="py-2">{cellValue}</div>;
    }
  }, []);
  if (!subscriptionData) {
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
  const rows = subscriptionData.subscriptions;
  function handlePagination(page: any) {
    setQueryOption((prev) => ({
      ...prev,
      offset: (page - 1) * prev.limit,
    }));
    setPage(page);
  }
  return (
    <div
      className={`${screenHeight < 650 ? "h-full" : "h-screen"} p-10 relative`}
    >
      <div
        className={`sm:absolute rounded-2xl p-3 bg-white sm:top-1/2 overflow-auto  sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2 min-w-[90%] xl:min-w-[900px] h-[85vh] min-h-[560px] shadow-md flex flex-col  ${
          screenHeight < 650 ? "min-h-[600px]" : ""
        }`}
      >
        <div className="px-2 flex flex-row justify-between">
          <Title level={3}>Subscriptions</Title>
          <AddSubscription />
        </div>

        <div className="flex flex-col relative h-full gap-y-[3%]  ">
          <div className="flex justify-center items-center flex-col gap-y-3 h-[30%] pt-4">
            <UpcomingSubscription />
          </div>
          <div className="flex justify-center items-center flex-col gap-y-3 ">
            <Table
              selectedKeys={selectedKeys}
              selectionMode="single"
              className="w-full sm:min-w-fit sm:w-[80%] "
              topContent={
                <div className="flex flex-row justify-between">
                  <div>
                    <Title level={4}>Subscriptions List</Title>
                  </div>
                  <DropDownCategory
                    selectedKeys={filter}
                    setSelectedKeys={setFilter}
                    filter={true}
                    selectMissing={false}
                  />
                </div>
              }
              bottomContent={
                <div className="flex w-full justify-center">
                  <Pagination
                    isCompact
                    showControls
                    showShadow
                    classNames={{
                      cursor:
                        " bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 to-gray-600 bg-gradient-to-r",
                    }}
                    page={page}
                    total={Math.ceil(
                      subscriptionData.countTotal / queryOption.limit
                    )}
                    onChange={(page) => handlePagination(page)}
                  />
                </div>
              }
            >
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn
                    key={column.key}
                    className={"text-md text-black p-2 "}
                    align="center"
                    width={column?.width || null}
                  >
                    {column.label}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={rows} emptyContent="No subscription to display">
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
      </div>
    </div>
  );
}

Subscription.getLayout = function PageLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
