import { BuildCategory } from "@/utils/buildCategory";
import { ConfigProvider, Empty, Popconfirm, Spin, Typography } from "antd";
import { ViewSubscription } from "./ViewSubscription";
import { CloseOutlined, LoadingOutlined } from "@ant-design/icons";
import {
  useUpcomingSubscriptionsQuery,
  useCloseSubscriptionMutation,
} from "@/hooks/useSubscriptionApi";
const { Title } = Typography;

function UpcomingItem({ item }: { item: any }) {
  const { closeSubscription, closeSubscriptionisLoading } =
    useCloseSubscriptionMutation();

  function handleSubmit(add: boolean) {
    closeSubscription({ add, subscriptionID: item._id });
  }
  return (
    <div className="transition-all duration-[300ms] ease-in-out w-[80%] p-2 rounded-2xl px-3 border border-gray-300 shadow-sm hover:shadow-lg hover:py-[11px] hover:w-[83%]">
      <div className="flex flex-row justify-between">
        <div className="font-bold text-sm flex flex-row gap-x-2 items-center">
          <BuildCategory categoryID={item.category} full={false} />
          <div>{item.name}</div>
        </div>
        <div
          className="bg-slate-200 justify-center items-center flex rounded-lg p-[2px] px-4"
          style={{
            backgroundColor: item.transaction_is_spending
              ? "#FFCCCC"
              : "#CCFFCC",
          }}
        >
          <div className="text-sm">${item.amount}</div>
        </div>
        <div className="flex flex-row gap-x-2 items-center">
          <ViewSubscription data={item} />
          <div>
            <ConfigProvider theme={{ token: { colorPrimary: "#000000" } }}>
              <Popconfirm
                placement="top"
                title={"Add transaction(s)"}
                onCancel={() => handleSubmit(false)}
                onConfirm={() => handleSubmit(true)}
                okText="Yes"
                cancelText="No"
                okButtonProps={{
                  style: { backgroundColor: "black", borderRadius: "6px" },
                }}
              >
                <CloseOutlined
                  className="cursor-pointer"
                  style={{ color: "#A1A1AA" }}
                />
              </Popconfirm>
            </ConfigProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
const antIcon = (
  <LoadingOutlined style={{ fontSize: 100, color: "black" }} spin />
);

export function UpcomingSubscription() {
  const { upcomingData, isLoading } = useUpcomingSubscriptionsQuery({
    limit: 15,
    offset: 0,
  });
  if (isLoading || !upcomingData) {
    return <Spin indicator={antIcon} className="flex" />;
  }
  const upcoming = upcomingData.upcoming;
  return (
    <div className="sm:w-[80%]  rounded-2xl border border-gray-300 shadow-lg h-full min-h-[130px] w-full  flex flex-col gap-y-2 sm:min-w-[410px]">
      <div className="px-[18px] pt-1">
        <Title level={4}>Upcoming</Title>
        <hr className="relative bottom-1" />
      </div>
      {upcoming.length == 0 && (
        <div className="h-[80%] relative bottom-6">
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No Upcoming Subscription"
          />
        </div>
      )}
      <div className="items-center flex flex-col  gap-y-2 overflow-auto w-[97%] h-[70%] rounded-md">
        {upcoming.length != 0 &&
          upcoming.map((item: any) => <UpcomingItem item={item} />)}
      </div>
    </div>
  );
}
