import { ReactElement, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import LoadingSpinner from "@/lib/loading";
import { DisplayTab, AddTab } from "@/lib/tab";
import { Layout } from "@/lib/(auth)/layout";
import { Empty, Spin, Typography } from "antd";
import { Divider } from "@nextui-org/react";
import { useTabsQuery } from "@/hooks/useTabApi";
import { LoadingOutlined } from "@ant-design/icons";
const { Title } = Typography;

const antIcon = (
  <LoadingOutlined style={{ fontSize: 100, color: "black" }} spin />
);
export default function Tab() {
  const queryClient = useQueryClient();
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [selectedBorrow, setSelectedBorrow] = useState(true);
  const updateScreenHeight = () => {
    setScreenHeight(window.innerHeight);
  };
  useEffect(() => {
    queryClient.invalidateQueries(["tabs"]);
  }, [selectedBorrow]);
  useEffect(() => {
    window.addEventListener("resize", updateScreenHeight);
    return () => {
      window.removeEventListener("resize", updateScreenHeight);
    };
  }, []);
  const { tabData, isLoading } = useTabsQuery({
    limit: 30,
    offset: 0,
    borrowed: selectedBorrow,
  });
  const rows = tabData?.tabs;
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
          <Title level={3}>Tabs</Title>
          <AddTab isBorrowed={selectedBorrow} changeView={setSelectedBorrow} />
        </div>
        <div className="mt-5 sm:px-2 md:pr-5 pb-2 flex flex-col md:flex-row md:justify-between h-[80%] items-center md:items-start">
          <div className="items-center md:items-end flex flex-start flex-row md:flex-col gap-x-8 gap-y-5 md:pt-5">
            <div className="group">
              <div
                className="cursor-pointer"
                onClick={() => setSelectedBorrow(true)}
              >
                <span className={`${selectedBorrow ? "font-bold" : ""}`}>
                  Borrow
                </span>
              </div>
              <div
                className={`black-bar  ${
                  selectedBorrow ? "w-full" : "w-0"
                } group-hover:w-full h-[1px] block transition-all duration-[1s]`}
              ></div>
            </div>
            <div className="group">
              <div
                className="cursor-pointer"
                onClick={() => setSelectedBorrow(false)}
              >
                <span className={`${!selectedBorrow ? "font-bold" : ""}`}>
                  Lend
                </span>
              </div>
              <div
                className={`black-bar  ${
                  !selectedBorrow ? "w-full" : "w-0"
                } group-hover:w-full h-[1px] block transition-all duration-[1s]`}
              ></div>
            </div>
          </div>
          <Divider
            orientation="vertical"
            className="h-[80%] w-[1.8px] rounded-xl hidden md:block absolute left-[100px]"
          />
          <Divider className="h-[1.8px] w-[80%] md:hidden mt-4" />

          <div
            className=" p-5 w-full sm:w-[85%] md:w-[80%] lg:w-[85%] h-full p-3 border border-gray mt-4 rounded-xl flex flex-col gap-y-5 overflow-auto relative "
            // style={{ backgroundColor: "cyan" }}
          >
            {!tabData && (
              <div className=" absolute  left-1/2 top-[45%] transform -translate-x-1/2 -translate-y-1/2">
                <Spin indicator={antIcon} className="flex" />
              </div>
            )}
            {tabData &&
              rows.map((row: any) => (
                <DisplayTab
                  key={row}
                  tab={row}
                  type={selectedBorrow}
                  changeView={setSelectedBorrow}
                />
              ))}
            {rows?.length == 0 && (
              <div className=" absolute  left-1/2 top-[45%] transform -translate-x-1/2 -translate-y-1/2">
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="No Tabs Recorded"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

Tab.getLayout = function PageLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
