import { useReportQuery } from "@/hooks/useReportApi";
import { BuildCategory } from "@/utils/buildCategory";
import { RiArrowUpSFill, RiArrowDownSFill } from "react-icons/ri";
export function CategoryReport({
  category,
  month,
  year,
}: {
  category: any;
  month: number;
  year: number;
}) {
  const { data: recievedData, isLoading: recievedIsLoading } = useReportQuery({
    category: category._id,
    month,
    year,
    isSpent: false,
  });

  const { data: spentData, isLoading: spentIsLoading } = useReportQuery({
    category: category._id,
    month,
    year,
    isSpent: true,
  });
  const total = recievedData?.recieved - spentData?.spent;
  return (
    <div className="shadow-md p-1.5 transition-all duration-[300ms] rounded-2xl px-5  hover:shadow-lg hover:p-3 flex flex-row justify-between">
      <div className="flex flex-row gap-x-3 items-center">
        <BuildCategory categoryID={category._id} full={false} />
        <div className="text-sm">{category.name}</div>
      </div>
      <div className="w-[50%] flex flex-row justify-between items-center">
        <div className="text-sm flex flex-row">
          <RiArrowUpSFill color="green" size={20} />
          <span className="text-emerald-400 font-bold">
            {recievedData?.recieved}
          </span>
        </div>
        <div className="text-sm flex flex-row ">
          <RiArrowDownSFill color="red" size={20} />
          <span className="text-rose-400 font-bold">{spentData?.spent}</span>
        </div>

        <div className="text-sm">
          Total:{" "}
          <span
            className={`${
              total < 0
                ? "text-rose-400"
                : total == 0
                ? "text-slate-400"
                : "text-emerald-400"
            } font-bold`}
          >
            ${Math.abs(total)}
          </span>
        </div>
      </div>
    </div>
  );
}
