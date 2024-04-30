import { Button, message, Spin, Typography } from "antd";
import { useLogout } from "@/hooks/useUserApi";
import { useAuthContext } from "@/hooks/useAuthContext";
import { LoadingOutlined } from "@ant-design/icons";
import { ReactElement, useEffect, useState } from "react";
import { useCategoriesQuery } from "@/hooks/useCategoryApi";
import { Layout } from "@/lib/(auth)/layout";
import { ChangeDate, CategoryReport } from "@/lib/report";
const { Title } = Typography;
const antIcon = (
  <LoadingOutlined style={{ fontSize: 100, color: "black" }} spin />
);
export default function Report() {
  const currentDate = new Date();
  const [year, setYear] = useState<any>([currentDate.getFullYear()]);
  const [month, setMonth] = useState<any>([currentDate.getMonth() + 1]);
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
  const { data: categoriesData, isLoading: categoryLoaading } =
    useCategoriesQuery();
  if (!categoriesData) {
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
  const categories = categoriesData.category;
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
          <Title level={3}>Spending Report</Title>
          <ChangeDate
            month={month}
            year={year}
            setMonth={setMonth}
            setYear={setYear}
          />
        </div>

        <div className="h-full m-5 shadow-lg rounded-lg p-2 px-4 border border-gray-300">
          <Title level={4}>
            {new Intl.DateTimeFormat("en", { month: "short" }).format(
              new Date(2000, parseInt(Array.from(month).join(", "), 10) - 1, 1)
            )}
            , {year}
          </Title>
          <hr />
          <div className="m-2 h-[83%] mt-4 overflow-auto flex flex-col justify-between  p-3">
            {categories.map((category: any) => (
              <CategoryReport
                key={category}
                category={category}
                month={parseInt(Array.from(month).join(", "), 10)}
                year={parseInt(Array.from(year).join(", "), 10)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Report.getLayout = function PageLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
